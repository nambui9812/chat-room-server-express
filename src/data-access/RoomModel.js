'use strict';

// Require packages
const mysqlx = require('@mysql/xdevapi');

function makeRoomModel() {
    return Object.freeze({
        findAll,
        findAllByAdminId,
        findById,
        create,
        update,
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
            .select(['id', 'adminId', 'createdDate'])
            .execute();
        const rooms = await result.fetchAll();

        return rooms.map(room => {
            return {
                id: room[0],
                adminId: room[1],
                createdDate: user[2]
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
            .select(['id', 'adminId', 'createdDate'])
            .where('adminId = :adminId')
            .bind('adminId', adminId)
            .execute();
        const rooms = await result.fetchAll();

        return rooms.map(room => {
            return {
                id: room[0],
                adminId: room[1],
                createdDate: user[2]
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
            .select(['id', 'adminId', 'createdDate'])
            .where('id = :id')
            .bind('id', id)
            .execute();
        const room = await result.fetchOne();

        if (!room) {
            return null;
        }

        return {
            id: room[0],
            adminId: room[1],
            createdOne: room[2]
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
            .insert(['id', 'adminId', 'createdDate'])
            .values([info.getId(), info.getAdminId(), info.getCreatedDate()])
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
        const roomsTable = schema.getTable('rooms');

        await roomsTable
            .update()
            .set('adminId', info.getAdminId())
            .where('id = :id')
            .bind('id', info.getId())
            .execute();
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
    }
};

module.exports = makeRoomModel;
