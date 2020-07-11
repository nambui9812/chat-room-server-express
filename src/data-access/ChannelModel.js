'use strict';

// Require packages
const mysqlx = require('@mysql/xdevapi');

function makeChannelModel() {
    return Object.freeze({
        findAll,
        findAllByRoomId,
        findById,
        create,
        update,
        deleteById,
        deleteByRoomId
    });

    async function findAll() {
        const session = await mysqlx.getSession({
            host: 'localhost',
            port: '33060',
            user: 'nam',
            password: 'namdeptrai'
        });

        const schema = session.getSchema('expressjs');
        const channelsTable = schema.getTable('channels');

        const result = await channelsTable
            .select(['id', 'roomId', 'adminId', 'name', 'createdDate'])
            .execute();
        const channels = await result.fetchAll();

        return channels.map(channel => {
            return {
                id: channel[0],
                roomId: channel[1],
                adminId: channel[2],
                name: channel[3],
                createdDate: channel[4]
            };
        });
    }

    async function findAllByRoomId(roomId) {
        const session = await mysqlx.getSession({
            host: 'localhost',
            port: '33060',
            user: 'nam',
            password: 'namdeptrai'
        });

        const schema = session.getSchema('expressjs');
        const channelsTable = schema.getTable('channels');

        const result = await channelsTable
            .select(['id', 'roomId', 'adminId', 'name', 'createdDate'])
            .where('roomId = :roomId')
            .bind('roomId', roomId)
            .execute();
        const channels = await result.fetchAll();

        return channels.map(channel => {
            return {
                id: channel[0],
                roomId: channel[1],
                adminId: channel[2],
                name: channel[3],
                createdDate: channel[4]
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
        const channelsTable = schema.getTable('channels');

        const result = await channelsTable
            .select(['id', 'roomId', 'adminId', 'name', 'createdDate'])
            .where('id = :id')
            .bind('id', id)
            .execute();
        const channel = await result.fetchOne();

        if (!channel) {
            return null;
        }

        return {
            id: channel[0],
            roomId: channel[1],
            adminId: channel[2],
            name: channel[3],
            createdDate: channel[4]
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
        const channelsTable = schema.getTable('channels');

        await channelsTable
            .insert(['id', 'roomId', 'adminId', 'name', 'createdDate'])
            .values([info.getId(), info.getRoomId(), info.getAdminId(), info.getName(), info.getCreatedDate()])
            .execute();

        const result = await channelsTable
            .select(['id', 'roomId', 'adminId', 'name', 'createdDate'])
            .where('id = :id')
            .bind('id', info.getId())
            .execute();
        const channel = await result.fetchOne();

        return {
            id: channel[0],
            roomId: channel[1],
            adminId: channel[2],
            name: channel[3],
            createdDate: channel[4]
        };
    }

    async function update(info) {
        const session = await mysqlx.getSession({
            host: 'localhost',
            port: '33060',
            user: 'nam',
            password: 'namdeptrai'
        });

        const schema = session.getSchema('expressjs');
        const channelsTable = schema.getTable('channels');

        await channelsTable
            .update()
            .set('name', info.getName())
            .where('id = :id')
            .bind('id', info.getId())
            .execute();

        const result = await channelsTable
            .select(['id', 'roomId', 'adminId', 'name', 'createdDate'])
            .where('id = :id')
            .bind('id', info.getId())
            .execute();
        const channel = await result.fetchOne();

        return {
            id: channel[0],
            roomId: channel[1],
            adminId: channel[2],
            name: channel[3],
            createdDate: channel[4]
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
        const channelsTable = schema.getTable('channels');

        await channelsTable
            .delete()
            .where('id = :id')
            .bind('id', id)
            .execute();
    }

    async function deleteByRoomId(roomId) {
        const session = await mysqlx.getSession({
            host: 'localhost',
            port: '33060',
            user: 'nam',
            password: 'namdeptrai'
        });

        const schema = session.getSchema('expressjs');
        const channelsTable = schema.getTable('channels');

        await channelsTable
            .delete()
            .where('roomId = :roomId')
            .bind('roomId', roomId)
            .execute();
    }
};

module.exports = makeChannelModel;
