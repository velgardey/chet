import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('New client connected');

  // Send a welcome message to the new client
  // ws.send(JSON.stringify('Welcome to the server!'));

  // Handle incoming messages from this client
  ws.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      console.log('Received:', parsedMessage);

      // Broadcast the parsed message to all connected clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(parsedMessage));
          console.log('Broadcasted:', parsedMessage);
        }
      });
    } catch (error) {
      console.error('Invalid JSON data received:', message);
    }
  });
});

console.log('WebSocket server started on port 8080');