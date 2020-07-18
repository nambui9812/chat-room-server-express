'use strict';

// Require packages
const mysqlx = require('@mysql/xdevapi');

function makeRoomModel() {
    return Object.freeze({
        findAll,
        findAllByAdminId,
        findById,
        create,
        updateAdmin,
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
        const roomsTable = schema.getTable('rooms');

        const result = await roomsTable
            .select(['id', 'adminId', 'name', 'createdDate'])
            .execute();
        const rooms = await result.fetchAll();

        session.close();

        return rooms.map(room => {
            return {
                id: room[0],
                adminId: room[1],
                name: room[2],
                createdDate: room[3]
            };
        });
    }

    async function findAllByAdminId(adminId) {
        const session = await mysqlx.getSession({
            host: 'localhost',
            port: '33060',
            user: 'nam',
            password: 'namdeptrai'
        });

        const schema = session.getSchema('expressjs');
        const roomsTable = schema.getTable('rooms');

        const result = await roomsTable
            .select(['id', 'adminId', 'name', 'createdDate'])
            .where('adminId = :adminId')
            .bind('adminId', adminId)
            .execute();
        const rooms = await result.fetchAll();

        session.close();

        return rooms.map(room => {
            return {
                id: room[0],
                adminId: room[1],
                name: room[2],
                createdDate: room[3]
            };
        });
    }

    async function findById(id) {
        const session = await mysqlx.getSession({
            host: 'localhost',
            port: '33060',
            user: 'nam',
            password: 'namdeptrai'
        });

        const schema = session.getSchema('expressjs');
        const roomsTable = schema.getTable('rooms');

        const result = await roomsTable
            .select(['id', 'adminId', 'name', 'createdDate'])
            .where('id = :id')
            .bind('id', id)
            .execute();
        const room = await result.fetchOne();

        session.close();

        if (!room) {
            return null;
        }

        return {
            id: room[0],
            adminId: room[1],
            name: room[2],
            createdDate: room[3]
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
        const roomsTable = schema.getTable('rooms');

        await roomsTable
            .insert(['id', 'adminId', 'name', 'createdDate'])
            .values([info.getId(), info.getAdminId(), info.getName(), info.getCreatedDate()])
            .execute();

        const result = await roomsTable
            .select(['id', 'adminId', 'name', 'createdDate'])
            .where('id = :id')
            .bind('id', info.getId())
            .execute();
        const room = await result.fetchOne();

        session.close();

        return {
            id: room[0],
            adminId: room[1],
            name: room[2],
            createdDate: room[3]
        };
    }

    async function updateAdmin(info) {
        const session = await mysqlx.getSession({
            host: 'localhost',
            port: '33060',
            user: 'nam',
            password: 'namdeptrai'
        });

        const schema = session.getSchema('expressjs');
        const roomsTable = schema.getTable('rooms');

        await roomsTable
            .update()
            .set('adminId', info.getAdminId())
            .where('id = :id')
            .bind('id', info.getId())
            .execute();

        const result = await roomsTable
            .select(['id', 'adminId', 'name', 'createdDate'])
            .where('id = :id')
            .bind('id', info.getId())
            .execute();
        const room = await result.fetchOne();

        session.close();

        return {
            id: room[0],
            adminId: room[1],
            name: room[2],
            createdDate: room[3]
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
        const roomsTable = schema.getTable('rooms');

        await roomsTable
            .delete()
            .where('id = :id')
            .bind('id', id)
            .execute();

        session.close();
    }
};

module.exports = makeRoomModel;
