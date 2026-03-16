const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

const WEB_SERVER = path.join(__dirname, '../../web/server.js');
const START_PORT = 3000;

function isPortFree(port) {
  return new Promise((resolve) => {
    const srv = http.createServer();
    srv.once('error', () => resolve(false));
    srv.once('listening', () => { srv.close(); resolve(true); });
    srv.listen(port);
  });
}

async function findFreePort(from) {
  for (let p = from; p < from + 10; p++) {
    if (await isPortFree(p)) return p;
  }
  throw new Error('Nenhuma porta disponível entre 3000 e 3009.');
}

function openBrowser(url) {
  const cmd = process.platform === 'win32' ? 'start'
    : process.platform === 'darwin'        ? 'open'
    : 'xdg-open';
  spawn(cmd, [url], { shell: true, detached: true, stdio: 'ignore' }).unref();
}

async function run() {
  const port = await findFreePort(START_PORT);
  const url  = `http://localhost:${port}`;

  const child = spawn(process.execPath, [WEB_SERVER], {
    env:   { ...process.env, PORT: String(port) },
    stdio: 'inherit',
    detached: false,
  });

  child.once('spawn', () => {
    // Aguarda o servidor subir antes de abrir o browser
    setTimeout(() => {
      console.log(`\n  Abrindo ${url} no browser...\n`);
      openBrowser(url);
    }, 1500);
  });

  child.once('exit', (code) => {
    process.exit(code ?? 0);
  });

  process.on('SIGINT', () => child.kill('SIGINT'));
}

run().catch((err) => {
  console.error('Erro ao iniciar servidor web:', err.message);
  process.exit(1);
});
