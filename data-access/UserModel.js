'use strict';

const mysqlx = require('@mysql/xdevapi');

function makeUserModel() {
    return Object.freeze({
        findAll,
        signUp,
        update,
        changePassword,
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

        const schema = session.getSchema('expressjs');
        const usersTable = schema.getTable('users');
        
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

        //let usersCollection = schema.getCollection('users');
        //console.log(await usersCollection.find().execute());
        //return usersCollection.find().execute();
    };

    async function findByUsername(username) {
        const session = await mysqlx.getSession({
            host: 'localhost',
            port: '33060',
            user: 'nam',
            password: 'namdeptrai'
        });

        const schema = session.getSchema('expressjs');
        const usersTable = schema.getTable('users');

        const result = await usersTable
            .select(['first_name', 'last_name', 'username', 'password'])
            .where('username = :username')
            .bind('username', username)
            .execute();
        const user = await result.fetchOne();
        
        return {
            firstName: user[0],
            lastName: user[1],
            username: user[2],
            password: user[3]
        };
    }

    async function signUp(info) {
        const session = await mysqlx.getSession({
            host: 'localhost',
            port: '33060',
            user: 'nam',
            password: 'namdeptrai'
        });

        const schema = session.getSchema('expressjs');
        const usersTable = schema.getTable('users');

        await usersTable
            .insert(['first_name', 'last_name', 'username', 'password'])
            .values([info.getFirstName(), info.getLastName(), info.getUsername(), info.getPassword()])
            .execute();
    }

    async function update(info) {
        const session = await mysqlx.getSession({
            host: 'localhost',
            port: '33060',
            user: 'nam',
            password: 'namdeptrai'
        });

        const schema = session.getSchema('expressjs');
        const usersTable = schema.getTable('users');

        await usersTable
            .update()
            .set('first_name', info.firstName)
            .set('last_name', info.lastName)
            .where('username = :username')
            .bind('username', info.username)
            .execute();

        const result = await usersTable
            .select(['first_name', 'last_name', 'username', 'password'])
            .where('username = :username')
            .bind('username', info.username)
            .execute();
        const user = await result.fetchOne();
        
        return {
            firstName: user[0],
            lastName: user[1],
            username: user[2],
            password: user[3]
        };
    }

    async function changePassword(info) {
        const session = await mysqlx.getSession({
            host: 'localhost',
            port: '33060',
            user: 'nam',
            password: 'namdeptrai'
        });

        const schema = session.getSchema('expressjs');
        const usersTable = schema.getTable('users');

        await usersTable
            .update()
            .set('password', info.password)
            .where('username = :username')
            .bind('username', info.username)
            .execute();

        const result = await usersTable
            .select(['first_name', 'last_name', 'username', 'password'])
            .where('username = :username')
            .bind('username', info.username)
            .execute();
        const user = await result.fetchOne();
        
        return {
            firstName: user[0],
            lastName: user[1],
            username: user[2],
            password: user[3]
        };
    }

    async function deleteByUsername(username) {
        const session = await mysqlx.getSession({
            host: 'localhost',
            port: '33060',
            user: 'nam',
            password: 'namdeptrai'
        });

        const schema = session.getSchema('expressjs');
        const usersTable = schema.getTable('users');

        await usersTable
            .delete()
            .where('username = :username')
            .bind('username', username)
            .execute();
    }
};

module.exports = makeUserModel;
