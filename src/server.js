'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('./data-access/database-connection');

// App
const app = express();

// Http server
const http = require('http').createServer(app);

// Socket server
const io = require('socket.io')(http);

// Socket connection
io.on('connect', (socket) => {

    socket.on('join channel', (channelId) => {
        socket.join(channelId);
    });

    socket.on('leave', () => {
        socket.leaveAll();
    });
    
});

// Routes
const users = require('./routes/users');
const rooms = require('./routes/rooms');
const channels = require('./routes/channels');
const members = require('./routes/members');
const messages = require('./routes/messages');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// Use socket io as a middleware,
// any route can use it now
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Routes
app.get('/', (req, res) => {
    res.send('Hello world.');
});

app.use('/api/users', users);
app.use('/api/rooms', rooms);
app.use('/api/channels', channels);
app.use('/api/members', members);
app.use('/api/messages', messages);

// Port
const port = process.env.PORT || 5000;

http.listen(port, () => console.log(`Server is running on port ${port}`));
