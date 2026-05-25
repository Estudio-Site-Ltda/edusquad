const http = require('http');
const fs = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');
const ptyManager = require('./pty-manager');
const stateWatcher = require('./state-watcher');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR   = path.join(__dirname, 'public');
const MEMORY_DIR   = path.join(__dirname, '..', '_edusquad', '_memory');
const DS_FILE      = path.join(MEMORY_DIR, 'design-system.md');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.ico':  'image/x-icon',
  '.png':  'image/png',
  '.svg':  'image/svg+xml',
};

// ─── HTTP Server ─────────────────────────────────────────────────────────────

const PROJECT_ROOT = path.join(__dirname, '..');
const SQUADS_DIR   = path.join(PROJECT_ROOT, 'squads');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost`);

  // ── API: leitura de arquivo de output ──────────────────────────────────
  if (url.pathname === '/api/file' && req.method === 'GET') {
    const rel      = url.searchParams.get('path') || '';
    const filePath = path.resolve(SQUADS_DIR, rel);

    if (!filePath.startsWith(SQUADS_DIR)) {
      res.writeHead(403); return res.end('Forbidden');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) { res.writeHead(404); return res.end('Not found'); }
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  // ── API: gravação de arquivo de output ─────────────────────────────────
  if (url.pathname === '/api/file' && req.method === 'POST') {
    const rel      = url.searchParams.get('path') || '';
    const filePath = path.resolve(SQUADS_DIR, rel);

    if (!filePath.startsWith(SQUADS_DIR)) {
      res.writeHead(403); return res.end('Forbidden');
    }

    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      fs.writeFile(filePath, body, 'utf8', (err) => {
        if (err) { res.writeHead(500); return res.end('Write error'); }
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('ok');
      });
    });
    return;
  }

  // ── API: design system — leitura ──────────────────────────────────────
  if (url.pathname === '/api/design-system' && req.method === 'GET') {
    fs.readFile(DS_FILE, 'utf8', (err, data) => {
      if (err) { res.writeHead(404); return res.end(''); }
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  // ── API: design system — gravação ──────────────────────────────────────
  if (url.pathname === '/api/design-system' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      fs.writeFile(DS_FILE, body, 'utf8', (err) => {
        if (err) { res.writeHead(500); return res.end('Write error'); }
        res.writeHead(200); res.end('ok');
      });
    });
    return;
  }

  // ── Arquivos estáticos ─────────────────────────────────────────────────
  let urlPath = url.pathname === '/' ? '/index.html' : url.pathname;
  const filePath = path.join(PUBLIC_DIR, urlPath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Not found');
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

// ─── WebSocket Server ─────────────────────────────────────────────────────────

const wss = new WebSocketServer({ server });

function send(ws, type, payload) {
  if (ws.readyState !== ws.OPEN) return;
  ws.send(JSON.stringify({ type, ...payload }));
}

function broadcast(type, payload) {
  const msg = JSON.stringify({ type, ...payload });
  for (const client of wss.clients) {
    if (client.readyState === client.OPEN) client.send(msg);
  }
}

wss.on('connection', (ws) => {
  console.log(`[WS] Cliente conectado (total: ${wss.clients.size})`);

  // Envia histórico do buffer ao novo cliente
  const buffer = ptyManager.getBuffer();
  if (buffer) send(ws, 'output', { text: buffer });

  // Informa status do PTY
  send(ws, 'status', { alive: ptyManager.isAlive() });

  // Envia histórico de projetos
  send(ws, 'history', { squads: stateWatcher.getHistory() });

  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    if (msg.type === 'input') {
      ptyManager.write(msg.text);
    }

    if (msg.type === 'resize') {
      ptyManager.resize(msg.cols, msg.rows);
    }
  });

  ws.on('close', () => {
    console.log(`[WS] Cliente desconectado (restantes: ${wss.clients.size})`);
  });

  ws.on('error', (err) => {
    console.error('[WS] Erro no cliente:', err.message);
  });
});

// ─── State Watcher → WebSocket bridge ────────────────────────────────────────

stateWatcher.onState((data) => {
  broadcast('state', { data });
});

stateWatcher.onHistory((squads) => {
  broadcast('history', { squads });
});

// ─── PTY → WebSocket bridge ───────────────────────────────────────────────────

ptyManager.onData((text) => {
  broadcast('output', { text });
});

ptyManager.onExit((exitCode) => {
  broadcast('status', { alive: false, exitCode });
});

// ─── Inicialização ────────────────────────────────────────────────────────────

server.listen(PORT, () => {
  console.log(`EduSquad Web rodando em http://localhost:${PORT}`);
  ptyManager.spawn();
  stateWatcher.start();
});

process.on('SIGINT', () => {
  ptyManager.kill();
  stateWatcher.stop();
  process.exit(0);
});

module.exports = { server, wss };
