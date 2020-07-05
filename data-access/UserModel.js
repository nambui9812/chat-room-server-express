'use strict';

const mysqlx = require('@mysql/xdevapi');

function makeUserModel() {
    return Object.freeze({
        findAll
    });

    async function findAll() {
        const session = await mysqlx.getSession({
            host: 'localhost',
            port: '33060',
            user: 'nam',
            password: 'namdeptrai'
        });

        const schema = await session.getSchema('expressjs');
        const usersTable = await schema.getTable('users');
        const result = await usersTable.select(['first_name', 'last_name', 'username']).execute();
        const allUsers = await result.fetchAll();

        return allUsers;
    };
};

module.exports = makeUserModel;
