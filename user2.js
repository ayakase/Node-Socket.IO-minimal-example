// user2.js
const { io } = require('socket.io-client');

// Connect to the Socket.IO server
const socket = io('http://localhost:4000');

socket.on('connect', () => {
    console.log('User 2 connected to server:', socket.id);

    // Function to send a message at random intervals
    const sendMessage = () => {
        const message = `Hello from User 2 at ${new Date().toLocaleTimeString()}`;
        socket.emit('message', message);
        console.log('User 2 sent:', message);

        // Set a random interval between 10 to 20 seconds (10000 to 20000 milliseconds)
        const interval = Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000;
        setTimeout(sendMessage, interval);
    };

    sendMessage(); // Start sending messages
});

socket.on('message', (data) => {
    console.log('User 2 received message from server:', data);
});

socket.on('disconnect', () => {
    console.log('User 2 disconnected from server');
});
