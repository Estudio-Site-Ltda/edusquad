#!/usr/bin/env node

const [,, command, ...args] = process.argv;

const commands = {
  init:   () => require('./commands/init'),
  update: () => require('./commands/update'),
  web:    () => require('./commands/web'),
};

if (!command || !commands[command]) {
  console.log(`
  🎓 EduSquad CLI

  Uso:
    npx edusquad init     — Instalar o EduSquad na pasta atual
    npx edusquad update   — Atualizar o core do framework
    npx edusquad web      — Abrir a interface web (localhost)

  `);
  process.exit(0);
}

commands[command]();
