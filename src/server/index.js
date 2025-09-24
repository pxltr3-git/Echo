import express from 'express';
import { WebSocketServer } from 'ws';
import { spawn } from 'node-pty';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4444; // Or any other port you prefer for the backend

// Serve static files from the 'public' directory (if needed, for example, for the client-side web-terminal)
// app.use(express.static(path.join(__dirname, '../../public')));

const server = app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', ws => {
  console.log('Client connected');

  // Spawn a new shell for each client
  const shell = process.platform === 'win32' ? 'powershell.exe' : 'bash';
  const env = { ...process.env, PS1: '\[\x1b[01;32m\]user@echo\[\x1b[00m\]:\w$ ' };
  const ptyProcess = spawn(shell, ['--norc', '--noprofile'], {
    name: 'xterm-color',
    cols: 80,
    rows: 24,
    cwd: process.cwd(), // Start in the project's root directory
    env: env
  });

  // Send data from pty to websocket
  ptyProcess.onData(data => {
    ws.send(data);
  });

  // Receive data from websocket and write to pty
  ws.on('message', message => {
    ptyProcess.write(message.toString());
  });

  // Handle client disconnect
  ws.on('close', () => {
    console.log('Client disconnected');
    ptyProcess.kill(); // Kill the pty process when client disconnects
  });

  // Handle pty exit
  ptyProcess.onExit(({ exitCode, signal }) => {
    console.log(`PTY process exited with code ${exitCode}, signal ${signal}`);
    ws.close(); // Close websocket when pty exits
  });

  // Handle websocket errors
  ws.on('error', error => {
    console.error('WebSocket error:', error);
    ptyProcess.kill();
  });
});

// Basic error handling for the Express server
app.on('error', error => {
  console.error('Express server error:', error);
});
