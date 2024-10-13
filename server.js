const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// Ініціалізація Express-додатку
const app = express();
const server = http.createServer(app);

// Ініціалізація WebSocket-сервера
const wss = new WebSocket.Server({ server });

// Обробник нових підключень
wss.on('connection', (ws) => {
  console.log('New client connected');

  // Обробник повідомлень від клієнта
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);

    // Відправлення повідомлення всім підключеним клієнтам
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  });

  // Обробник закриття підключення
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Старт сервера
const PORT = process.env.PORT || 3005;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
