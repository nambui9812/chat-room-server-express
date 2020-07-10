'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('./data-access/database-connection');

const users = require('./routes/users');
const rooms = require('./routes/rooms');

// App
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('Hello world.');
});

app.use('/api/users', users);
app.use('/api/rooms', rooms);

// Port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
