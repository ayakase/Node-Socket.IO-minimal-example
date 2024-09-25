// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve the client files (optional, depending on your setup)
app.get('/', (req, res) => {
    res.send('Socket.IO server is running');
});

// Socket.IO logic
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for messages from clients
    socket.on('message', (data) => {
        console.log('Message received from client:', data);

        // Optionally, broadcast the message to all connected clients
        socket.broadcast.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
