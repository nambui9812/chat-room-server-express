'use strict';

const mysqlx = require('@mysql/xdevapi');

function makeUserModel() {
    return Object.freeze({
        findAll,
        signUp,
        findByUsername,
        deleteByUsername
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
        const result = await usersTable
            .select(['first_name', 'last_name', 'username'])
            .execute();
        const users = await result.fetchAll();

        return users.map(user => {
            return {
                firstName: user[0],
                lastName: user[1],
                username: user[2]
            };
        });
    };

    async function findByUsername(username) {
        const session = await mysqlx.getSession({
            host: 'localhost',
            port: '33060',
            user: 'nam',
            password: 'namdeptrai'
        });

        const schema = await session.getSchema('expressjs');
        const usersTable = await schema.getTable('users');
        const result = await usersTable
            .select(['first_name', 'last_name', 'username', 'password'])
            .where('username = :username')
            .bind('username', username)
            .execute();
        const user = await result.fetchOne();
        
        return user;
    }

    async function signUp(info) {
        const session = await mysqlx.getSession({
            host: 'localhost',
            port: '33060',
            user: 'nam',
            password: 'namdeptrai'
        });

        const schema = await session.getSchema('expressjs');
        const usersTable = await schema.getTable('users');

        await usersTable
            .insert(['first_name', 'last_name', 'username', 'password'])
            .values([info.getFirstName(), info.getLastName(), info.getUsername(), info.getPassword()])
            .execute();
    }

    async function deleteByUsername(username) {
        const session = await mysqlx.getSession({
            host: 'localhost',
            port: '33060',
            user: 'nam',
            password: 'namdeptrai'
        });

        const schema = await session.getSchema('expressjs');
        const usersTable = await schema.getTable('users');

        await usersTable
            .delete()
            .where('username = :username')
            .bind('username', username)
            .execute();
    }
};

module.exports = makeUserModel;
