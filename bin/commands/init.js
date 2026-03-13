#!/usr/bin/env node

const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO = 'Estudio-Site-Ltda/edusquad';
const TARGET = process.cwd();

// ── Helpers ──────────────────────────────────────────────────────────────────

function log(msg)     { console.log(`  ${msg}`); }
function success(msg) { console.log(`  ✅ ${msg}`); }
function warn(msg)    { console.log(`  ⚠️  ${msg}`); }
function error(msg)   { console.error(`  ❌ ${msg}`); }

function separator() {
  console.log('  ' + '─'.repeat(50));
}

function checkPrerequisite(cmd, name, installUrl) {
  try {
    execSync(`${cmd} --version`, { stdio: 'ignore' });
    return true;
  } catch {
    warn(`${name} não encontrado. Instale em: ${installUrl}`);
    return false;
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

console.log('');
console.log('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  🎓 EduSquad — Instalação');
console.log('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');

// 1. Verificar pré-requisitos
log('Verificando pré-requisitos...');
separator();

const hasGit    = checkPrerequisite('git', 'Git', 'https://git-scm.com');
const hasChrome = (() => {
  const paths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
  ];
  return paths.some(p => fs.existsSync(p));
})();

if (!hasGit) {
  error('Git é obrigatório. Instale em https://git-scm.com e tente novamente.');
  process.exit(1);
}

if (!hasChrome) {
  warn('Google Chrome não detectado. Algumas skills (Playwright) podem não funcionar.');
  warn('Instale em: https://google.com/chrome');
}

success('Pré-requisitos OK');
console.log('');

// 2. Verificar se a pasta já tem conteúdo
const existingFiles = fs.readdirSync(TARGET).filter(f => !f.startsWith('.'));
if (existingFiles.length > 0) {
  warn(`A pasta atual não está vazia: ${TARGET}`);
  warn('O EduSquad será instalado aqui mesmo. Arquivos existentes serão preservados.');
  console.log('');
}

// 3. Baixar framework com degit
log('Baixando framework do GitHub...');
separator();

try {
  // Tenta usar degit se disponível, senão usa git clone
  try {
    execSync(`npx degit ${REPO} . --force`, {
      stdio: 'inherit',
      cwd: TARGET,
    });
  } catch {
    // Fallback: git clone + remover .git
    log('Usando git clone como alternativa...');
    execSync(`git clone https://github.com/${REPO}.git .tmp_edusquad`, {
      stdio: 'inherit',
      cwd: TARGET,
    });

    // Copiar arquivos (exceto .git)
    const tmpDir = path.join(TARGET, '.tmp_edusquad');
    const items = fs.readdirSync(tmpDir);
    for (const item of items) {
      if (item === '.git') continue;
      execSync(`cp -r "${path.join(tmpDir, item)}" "${TARGET}"`, { stdio: 'ignore' });
    }

    // Limpar temporário
    execSync(`rm -rf "${tmpDir}"`, { stdio: 'ignore' });
  }

  success('Framework baixado com sucesso');
} catch (e) {
  error('Falha ao baixar o framework.');
  error(e.message);
  process.exit(1);
}

console.log('');

// 4. Instalar dependências npm
log('Instalando dependências...');
separator();

try {
  execSync('npm install', { stdio: 'inherit', cwd: TARGET });
  success('Dependências instaladas');
} catch (e) {
  warn('Falha ao instalar dependências. Execute "npm install" manualmente.');
}

console.log('');

// 5. Criar .env de exemplo se não existir
const envPath = path.join(TARGET, '.env');
const envExamplePath = path.join(TARGET, '.env.example');

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  fs.copyFileSync(envExamplePath, envPath);
  success('.env criado a partir do .env.example');
} else if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, '# EduSquad — Variáveis de Ambiente\n# Preencha as chaves das integrações que for usar\n\n# CANVA_API_KEY=\n# ELEVENLABS_API_KEY=\n# HEYGEN_API_KEY=\n# MOODLE_URL=\n# MOODLE_TOKEN=\n# LMS_ESTUDIO_URL=\n# LMS_ESTUDIO_API_KEY=\n');
  success('.env criado (preencha suas chaves de API)');
}

// 6. Mensagem final
console.log('');
console.log('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  🎉 EduSquad instalado com sucesso!');
console.log('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
console.log('  Próximos passos:');
console.log('');
console.log('  1. Abra esta pasta no seu IDE (Claude Code, Cursor...)');
console.log('  2. Digite /edusquad para iniciar o framework');
console.log('  3. O onboarding será iniciado automaticamente');
console.log('');
console.log('  Dica: edite .env com suas chaves de API quando precisar');
console.log('        de integrações (Canva, Moodle, etc.)');
console.log('');
console.log('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
