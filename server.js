const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on('connection', (ws) => {
    clients.push(ws);

    // Når en besked modtages fra en klient
    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'update-score') {
            const { id, value } = data.payload;

            // Send opdateringen til alle klienter
            clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        type: 'update-score',
                        payload: { id, value }
                    }));
                }
            });
        }
    });

    // Håndter forbindelse lukning
    ws.on('close', () => {
        clients = clients.filter(client => client !== ws);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
