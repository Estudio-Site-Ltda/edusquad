const os = require('os');
const path = require('path');
const pty = require('node-pty');

const PROJECT_ROOT = path.join(__dirname, '..');
const BUFFER_MAX_LINES = 500;

let ptyProcess = null;
let outputBuffer = [];
const dataListeners = new Set();
const exitListeners = new Set();

function appendBuffer(data) {
  outputBuffer.push(data);
  if (outputBuffer.length > BUFFER_MAX_LINES) {
    outputBuffer.shift();
  }
}

function spawn() {
  if (ptyProcess) return;

  const shell = os.platform() === 'win32' ? 'cmd.exe' : 'bash';
  const shellArgs = os.platform() === 'win32' ? ['/c', 'claude'] : ['-c', 'claude'];

  ptyProcess = pty.spawn(shell, shellArgs, {
    name: 'xterm-color',
    cols: 220,
    rows: 50,
    cwd: PROJECT_ROOT,
    env: { ...process.env, TERM: 'xterm-color', COLORTERM: 'truecolor' },
  });

  console.log(`[PTY] Claude Code iniciado (PID: ${ptyProcess.pid})`);

  ptyProcess.onData((data) => {
    appendBuffer(data);
    for (const cb of dataListeners) cb(data);
  });

  ptyProcess.onExit(({ exitCode }) => {
    console.log(`[PTY] Claude Code encerrado (código: ${exitCode})`);
    ptyProcess = null;
    for (const cb of exitListeners) cb(exitCode);
  });
}

function write(data) {
  if (!ptyProcess) {
    console.warn('[PTY] Tentativa de escrita sem processo ativo');
    return;
  }
  ptyProcess.write(data);
}

function resize(cols, rows) {
  if (!ptyProcess) return;
  ptyProcess.resize(cols, rows);
}

function isAlive() {
  return ptyProcess !== null;
}

function getBuffer() {
  return outputBuffer.join('');
}

function clearBuffer() {
  outputBuffer = [];
}

function onData(cb) {
  dataListeners.add(cb);
  return () => dataListeners.delete(cb);
}

function onExit(cb) {
  exitListeners.add(cb);
  return () => exitListeners.delete(cb);
}

function kill() {
  if (!ptyProcess) return;
  ptyProcess.kill();
  ptyProcess = null;
}

module.exports = { spawn, write, resize, isAlive, getBuffer, clearBuffer, onData, onExit, kill };
