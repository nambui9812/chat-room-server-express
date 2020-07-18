'use strict';

const mysqlx = require('@mysql/xdevapi');

// Connect to database server
mysqlx
    .getSession({
        host: 'localhost',
        port: '33060',
        user: 'nam',
        password: 'namdeptrai'
    })
    .then(session => {
        console.log('Database connected');
        session.close();
    })
    .catch(err => {
        console.log(err);
    });

module.exports = mysqlx;
