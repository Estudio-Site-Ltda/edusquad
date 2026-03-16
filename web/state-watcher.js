const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const PROJECT_ROOT = path.join(__dirname, '..');
const SQUADS_DIR = path.join(PROJECT_ROOT, 'squads');

const stateListeners = new Set();
const historyListeners = new Set();

let watcher = null;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function buildHistory() {
  if (!fs.existsSync(SQUADS_DIR)) return [];

  return fs.readdirSync(SQUADS_DIR)
    .filter((name) => {
      const dir = path.join(SQUADS_DIR, name);
      return fs.statSync(dir).isDirectory() && name !== '.gitkeep';
    })
    .map((name) => {
      const outputDir = path.join(SQUADS_DIR, name, 'output');
      const runs = fs.existsSync(outputDir)
        ? fs.readdirSync(outputDir)
            .filter((r) => fs.statSync(path.join(outputDir, r)).isDirectory())
            .map((runId) => {
              const runDir = path.join(outputDir, runId);
              const files = collectFiles(runDir);
              return { id: runId, files };
            })
            .sort((a, b) => b.id.localeCompare(a.id))
        : [];

      const yamlPath = path.join(SQUADS_DIR, name, 'squad.yaml');
      const hasYaml = fs.existsSync(yamlPath);

      return { name, hasYaml, runs };
    });
}

function collectFiles(dir, base = '') {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    const rel = base ? `${base}/${entry}` : entry;
    return fs.statSync(full).isDirectory() ? collectFiles(full, rel) : [rel];
  });
}

// ─── Notifiers ────────────────────────────────────────────────────────────────

function notifyState(data) {
  for (const cb of stateListeners) cb(data);
}

function notifyHistory() {
  const squads = buildHistory();
  for (const cb of historyListeners) cb(squads);
}

// ─── Watcher ─────────────────────────────────────────────────────────────────

function start() {
  if (watcher) return;

  watcher = chokidar.watch(SQUADS_DIR, {
    persistent: true,
    ignoreInitial: false,
    depth: 5,
  });

  // state.json alterado ou criado
  watcher.on('add', handleStateChange);
  watcher.on('change', handleStateChange);

  // state.json removido (squad concluído)
  watcher.on('unlink', (filePath) => {
    if (path.basename(filePath) === 'state.json') {
      notifyState({ status: 'completed', squad: null });
    }
    // Qualquer mudança em squads/ atualiza o histórico
    notifyHistory();
  });

  // Nova pasta ou arquivo gerado → atualiza histórico
  watcher.on('addDir', () => notifyHistory());

  console.log(`[Watcher] Monitorando ${SQUADS_DIR}`);
}

function handleStateChange(filePath) {
  if (path.basename(filePath) !== 'state.json') {
    // Arquivo de output gerado — atualiza histórico
    notifyHistory();
    return;
  }

  const data = readJson(filePath);
  if (data) {
    notifyState(data);
  }
}

// ─── API pública ──────────────────────────────────────────────────────────────

function onState(cb) {
  stateListeners.add(cb);
  return () => stateListeners.delete(cb);
}

function onHistory(cb) {
  historyListeners.add(cb);
  return () => historyListeners.delete(cb);
}

function getHistory() {
  return buildHistory();
}

function stop() {
  if (watcher) { watcher.close(); watcher = null; }
}

module.exports = { start, stop, onState, onHistory, getHistory };
