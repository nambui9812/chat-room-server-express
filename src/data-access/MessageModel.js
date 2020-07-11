'use strict';

const mysqlx = require('@mysql/xdevapi');

function makeMessageModel() {
    return Object.freeze({
        findAll,
        findById,
        create,
        update,
        deleteById,
        deleteByChannelId,
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
        const messagesTable = schema.getTable('messages');
        
        const result = await messagesTable
            .select(['id', 'userId', 'roomId', 'channelId', 'content', 'createdDate'])
            .execute();
        const messages = await result.fetchAll();

        return messages.map(message => {
            return {
                id: message[0],
                userId: message[1],
                roomId: message[2],
                channelId: message[3],
                content: message[4],
                createdDate: message[5]
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
        const messagesTable = schema.getTable('messages');

        const result = await messagesTable
            .select(['id', 'userId', 'roomId', 'channelId', 'content', 'createdDate'])
            .where('id = :id')
            .bind('id', id)
            .execute();
        const message = await result.fetchOne();

        if(!message) {
            return null;
        }
        
        return {
            id: message[0],
            userId: message[1],
            roomId: message[2],
            channelId: message[3],
            content: message[4],
            createdDate: message[5]
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
        const messagesTable = schema.getTable('messages');

        await messagesTable
            .insert(['id', 'userId', 'roomId', 'channelId', 'content', 'createdDate'])
            .values([info.getId(), info.getUserId(), info.getRoomId(), info.getChannelId(), info.getContent(), info.getCreatedDate()])
            .execute();

        const result = await messagesTable
            .select(['id', 'userId', 'roomId', 'channelId', 'content', 'createdDate'])
            .where('id = :id')
            .bind('id', info.getId())
            .execute();
        const message = await result.fetchOne();
        
        return {
            id: message[0],
            userId: message[1],
            roomId: message[2],
            channelId: message[3],
            content: message[4],
            createdDate: message[5]
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
        const messagesTable = schema.getTable('messages');

        await messagesTable
            .update()
            .set('content', info.getContent())
            .where('id = :id')
            .bind('id', info.getId())
            .execute();

        const result = await messagesTable
            .select(['id', 'userId', 'roomId', 'channelId', 'content', 'createdDate'])
            .where('id = :id')
            .bind('id', info.getId())
            .execute();
        const message = await result.fetchOne();
        
        return {
            id: message[0],
            userId: message[1],
            roomId: message[2],
            channelId: message[3],
            content: message[4],
            createdDate: message[5]
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
        const messagesTable = schema.getTable('messages');

        await messagesTable
            .delete()
            .where('id = :id')
            .bind('id', id)
            .execute();
    }

    async function deleteByChannelId(channelId) {
        const session = await mysqlx.getSession({
            host: 'localhost',
            port: '33060',
            user: 'nam',
            password: 'namdeptrai'
        });

        const schema = session.getSchema('expressjs');
        const messagesTable = schema.getTable('messages');

        await messagesTable
            .delete()
            .where('channelId = :channelId')
            .bind('channelId', channelId)
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
        const messagesTable = schema.getTable('messages');

        await messagesTable
            .delete()
            .where('roomId = :roomId')
            .bind('roomId', roomId)
            .execute();
    }
};

module.exports = makeMessageModel;
