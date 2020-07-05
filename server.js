'use strict';

const express = require('express');

const users = require('./routes/users');
require('./data-access/database-connection');

const app = express();

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello world.');
});

app.use('/users', users);

app.listen(port, () => console.log(`Server is running on port ${port}`));
