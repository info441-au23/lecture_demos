import express from 'express';
import enableWs from 'express-ws';

const app = express();
app.use(express.static('public'));
enableWs(app);

let socketCounter = 0;
const sockets = {};

app.ws('/chats', (ws, res) => {
    const myId = `${socketCounter}`;
    socketCounter++;
    sockets[myId] = ws;
    console.info(`Created socket connection with id ${myId}`);

    ws.on('message', (data) => {
        const message = data;
        console.info(`Received message ${message} on socket ${myId}`);
        Object.values(sockets).forEach((socket) => {
            socket.send(`${myId}: ${message}`);
        });
    });

    ws.on('close', () => {
        delete sockets[myId];
    });
});

app.listen(3000, () => {
    console.log(`Express listening on port 3000`);
});
