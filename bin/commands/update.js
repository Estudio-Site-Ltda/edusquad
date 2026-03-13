#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO = 'Estudio-Site-Ltda/edusquad';
const TARGET = process.cwd();

// Pastas do core que serão atualizadas (dados do usuário são preservados)
const CORE_DIRS = [
  '_edusquad/core',
  '_edusquad/config',
  '.claude/skills/edusquad',
  '.agents/skills/edusquad',
  '.agent/workflows',
  'skills/bloom',
  'skills/instructional-design',
  'skills/video-script',
  'skills/edusquad-skill-creator',
];

// Arquivos raiz que serão atualizados
const CORE_FILES = [
  'CLAUDE.md',
  'AGENTS.md',
  'bin/cli.js',
  'bin/commands/init.js',
  'bin/commands/update.js',
];

// Estes NUNCA são sobrescritos (dados do usuário)
const PROTECTED = [
  '_edusquad/_memory',
  '_edusquad/_browser_profile',
  'squads',
  '.env',
  '.gitignore',
];

function log(msg)     { console.log(`  ${msg}`); }
function success(msg) { console.log(`  ✅ ${msg}`); }
function warn(msg)    { console.log(`  ⚠️  ${msg}`); }
function error(msg)   { console.error(`  ❌ ${msg}`); }

// ── Main ─────────────────────────────────────────────────────────────────────

console.log('');
console.log('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  🎓 EduSquad — Atualização do Framework');
console.log('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');

// 1. Verificar se está em um projeto EduSquad
if (!fs.existsSync(path.join(TARGET, '_edusquad'))) {
  error('Pasta _edusquad não encontrada.');
  error('Execute este comando dentro de um projeto EduSquad instalado.');
  process.exit(1);
}

// 2. Baixar versão mais recente em pasta temporária
log('Baixando versão mais recente do GitHub...');

const tmpDir = path.join(TARGET, '.tmp_edusquad_update');

try {
  if (fs.existsSync(tmpDir)) {
    execSync(`rm -rf "${tmpDir}"`, { stdio: 'ignore' });
  }

  try {
    execSync(`npx degit ${REPO} "${tmpDir}" --force`, { stdio: 'inherit' });
  } catch {
    execSync(`git clone https://github.com/${REPO}.git "${tmpDir}"`, { stdio: 'inherit' });
  }

  success('Download concluído');
} catch (e) {
  error('Falha ao baixar atualização: ' + e.message);
  process.exit(1);
}

console.log('');

// 3. Atualizar pastas do core
log('Atualizando arquivos do core...');

let updated = 0;

for (const dir of CORE_DIRS) {
  const src = path.join(tmpDir, dir);
  const dst = path.join(TARGET, dir);
  if (fs.existsSync(src)) {
    execSync(`rm -rf "${dst}"`, { stdio: 'ignore' });
    execSync(`cp -r "${src}" "${dst}"`, { stdio: 'ignore' });
    log(`  → ${dir}`);
    updated++;
  }
}

for (const file of CORE_FILES) {
  const src = path.join(tmpDir, file);
  const dst = path.join(TARGET, file);
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
    log(`  → ${file}`);
    updated++;
  }
}

success(`${updated} itens atualizados`);
console.log('');

// 4. Limpar temporário
execSync(`rm -rf "${tmpDir}"`, { stdio: 'ignore' });

// 5. Mensagem final
console.log('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  ✅ EduSquad atualizado com sucesso!');
console.log('');
log('Preservados (seus dados):');
for (const p of PROTECTED) log(`  • ${p}`);
console.log('');
log('Reabra o projeto no seu IDE para carregar as novidades.');
console.log('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
