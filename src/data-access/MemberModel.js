'use strict';

const mysqlx = require('@mysql/xdevapi');

function makeMemberModel() {
    return Object.freeze({
        findAll,
        findById,
        create,
        update,
        updateRole,
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
        const membersTable = schema.getTable('members');
        
        const result = await membersTable
            .select(['id', 'userId', 'roomId', 'name', 'role', 'createdDate'])
            .execute();
        const members = await result.fetchAll();

        return members.map(member => {
            return {
                id: member[0],
                userId: member[1],
                roomId: member[2],
                name: member[3],
                role: member[4],
                createdDate: member[5]
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
        const membersTable = schema.getTable('members');

        const result = await membersTable
            .select(['id', 'userId', 'roomId', 'name', 'role', 'createdDate'])
            .where('id = :id')
            .bind('id', id)
            .execute();
        const member = await result.fetchOne();

        if(!member) {
            return null;
        }
        
        return {
            id: member[0],
            userId: member[1],
            roomId: member[2],
            name: member[3],
            role: member[4],
            createdDate: member[5]
        };
    }

    async function create(info) {
        const session = await mysqlx.getSession({
            host: 'localhost',
            port: '33060',
            user: 'nam',
            password: 'namdeptrai'
        });

        const schema = session.getSchema('expressjs');
        const membersTable = schema.getTable('members');

        await membersTable
            .insert(['id', 'userId', 'roomId', 'name', 'role', 'createdDate'])
            .values([info.getId(), info.getUserId(), info.getRoomId(), info.getName(), info.getRole(), info.getCreatedDate()])
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
        const membersTable = schema.getTable('members');

        await membersTable
            .update()
            .set('name', info.getName())
            .where('id = :id')
            .bind('id', info.getId())
            .execute();

        const result = await membersTable
            .select(['id', 'userId', 'roomId', 'name', 'role', 'createdDate'])
            .where('id = :id')
            .bind('id', info.getId())
            .execute();
        const member = await result.fetchOne();
        
        return {
            id: member[0],
            userId: member[1],
            roomId: member[2],
            name: member[3],
            role: member[4],
            createdDate: member[5]
        };
    }

    async function updateRole(info) {
        const session = await mysqlx.getSession({
            host: 'localhost',
            port: '33060',
            user: 'nam',
            password: 'namdeptrai'
        });

        const schema = session.getSchema('expressjs');
        const membersTable = schema.getTable('members');

        await membersTable
            .update()
            .set('role', info.getRole())
            .where('id = :id')
            .bind('id', info.getId())
            .execute();

        const result = await membersTable
            .select(['id', 'userId', 'roomId', 'name', 'role', 'createdDate'])
            .where('id = :id')
            .bind('id', info.getId())
            .execute();
        const member = await result.fetchOne();
        
        return {
            id: member[0],
            userId: member[1],
            roomId: member[2],
            name: member[3],
            role: member[4],
            createdDate: member[5]
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
        const membersTable = schema.getTable('members');

        await membersTable
            .delete()
            .where('id = :id')
            .bind('id', id)
            .execute();
    }
};

module.exports = makeMemberModel;
