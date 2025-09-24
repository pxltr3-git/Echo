import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('terminal-container');
  if (container) {
    const term = new Terminal({
      cursorBlink: true,
      convertEol: true
    });
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    term.open(container);
    fitAddon.fit();

    function connect(retries = 5, delay = 1000) {
      const ws = new WebSocket('ws://localhost:4444');

      ws.onopen = () => {
        console.log('WebSocket connected');
        term.onData(data => {
          ws.send(data);
        });

        ws.onmessage = event => {
          term.write(event.data);
        };

        ws.onclose = () => {
          console.log('WebSocket disconnected');
          term.write('\r\nConnection closed.\r\n');
        };

        ws.onerror = error => {
          console.error('WebSocket error:', error);
          term.write('\r\nWebSocket error.\r\n');
        };
      };

      ws.onerror = error => {
        console.error('WebSocket connection error:', error);
        if (retries > 0) {
          term.write(`\r\nConnection failed. Retrying in ${delay / 1000}s...`);
          setTimeout(() => connect(retries - 1, delay), delay);
        } else {
          container.innerText = 'Failed to connect to terminal backend.';
        }
      };
    }

    connect();
  }
});