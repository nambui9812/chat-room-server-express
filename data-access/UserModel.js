'use strict';

const mysqlx = require('@mysql/xdevapi');

function makeUserModel() {
    return Object.freeze({
        findAll,
        findById,
        findByUsername,
        signUp,
        changeName,
        changePassword,
        deleteById
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
            .select(['id', 'name', 'username', 'createdDate'])
            .execute();
        const users = await result.fetchAll();

        return users.map(user => {
            return {
                id: user[0],
                name: user[1],
                username: user[2],
                createdDate: user[3]
            };
        });
    };

    async function findById(id) {
        const session = await mysqlx.getSession({
            host: 'localhost',
            port: '33060',
            user: 'nam',
            password: 'namdeptrai'
        });

        const schema = session.getSchema('expressjs');
        const usersTable = schema.getTable('users');

        const result = await usersTable
            .select(['id', 'name', 'username', 'password', 'createdDate'])
            .where('id = :id')
            .bind('id', id)
            .execute();
        const user = await result.fetchOne();

        if(!user) {
            return null;
        }
        
        return {
            id: user[0],
            name: user[1],
            username: user[2],
            password: user[3],
            createdDate: user[4]
        };
    }

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
            .select(['id', 'name', 'username', 'password', 'createdDate'])
            .where('username = :username')
            .bind('username', username)
            .execute();
        const user = await result.fetchOne();

        if(!user) {
            return null;
        }
        
        return {
            id: user[0],
            name: user[1],
            username: user[2],
            password: user[3],
            createdDate: user[4]
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
            .insert(['id', 'name', 'username', 'password', 'createdDate'])
            .values([info.getId(), info.getName(), info.getUsername(), info.getPassword(), info.getCreatedDate()])
            .execute();
    }

    async function changeName(info) {
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
            .set('name', info.getName())
            .where('id = :id')
            .bind('id', info.getId())
            .execute();

        const result = await usersTable
            .select(['id', 'name', 'username', 'password', 'createdDate'])
            .where('id = :id')
            .bind('id', info.getId())
            .execute();
        const user = await result.fetchOne();
        
        return {
            id: user[0],
            name: user[1],
            username: user[2],
            password: user[3],
            createdDate: user[4]
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
            .set('password', info.getPassword())
            .where('id = :id')
            .bind('id', info.getId())
            .execute();

        const result = await usersTable
            .select(['id', 'name', 'username', 'password', 'createdDate'])
            .where('id = :id')
            .bind('id', info.getId())
            .execute();
        const user = await result.fetchOne();
        
        return {
            firstName: user[0],
            lastName: user[1],
            username: user[2],
            password: user[3]
        };
    }

    async function deleteById(id) {
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
            .where('id = :id')
            .bind('id', id)
            .execute();
    }
};

module.exports = makeUserModel;
