'use strict';

// Require packages
const cuid = require('cuid');
const { makeRooms, makeChannels } = require('../entities/index');

function makeChannelService({ RoomModel, ChannelModel, MessageModel }) {
    return Object.freeze({
        findAll,
        findAllByRoomId,
        findById,
        create,
        update,
        deleteById
    });

    function findAll() {
        return ChannelModel.findAll();
    }

    function findAllByRoomId(roomId) {
        return ChannelModel.findAllByRoomId(roomId);
    }

    async function findById(id) {
        if (!id || id.length === 0 || !cuid.isCuid(id)) {
            throw new Error('Invalid id.');
        }

        // Check if channel exist
        const channel = await ChannelModel.findById(id);
        if (!channel) {
            throw new Error('Channel not found.');
        }

        return channel;
    }

    async function create(info) {
        if (!info.currentUserId || info.currentUserId.length === 0 || !cuid.isCuid(info.currentUserId)) {
            throw new Error('Unauthorization');
        }

        if (!info.roomId || info.roomId.length === 0 || !cuid.isCuid(info.roomId)) {
            throw new Error('Invalid room id.');
        }

        if (!info.name || info.name.length === 0) {
            throw new Error('Invalid name.');
        }

        // Check if room exist
        const room = await RoomModel.findById(info.roomId);
        if (!room) {
            throw new Error('Room not found.')
        }
        
        // Make room
        const foundRoom = makeRooms(room);
        
        // Check authorization to create channel
        if (foundRoom.getAdminId() !== info.currentUserId) {
            throw new Error('Unauthorization.');
        }

        // Get adminId for channel
        info.adminId = info.currentUserId;

        // Make channel
        const newChannel = makeChannels(info);

        // Create
        return ChannelModel.create(newChannel);
    }

    async function update(info) {
        if (!info.id || info.id.length === 0 || !cuid.isCuid(info.id)) {
            throw new Error('Invalid id.');
        }

        if (!info.newName || info.newName.length === 0) {
            throw new Error('Invalid name.');
        }

        // Check if channel exist
        const foundChannel = await ChannelModel.findById(info.id);
        if (!foundChannel) {
            throw new Error('Channel not found.');
        }

        // Make channel
        const updatedChannel = makeChannels(foundChannel);

        // Check authorization tp update channel
        if (updatedChannel.getAdminId() !== info.currentUserId) {
            throw new Error('Unauthorization.');
        }

        // Update channel
        updatedChannel.updateName(info.newName);

        // Save
        return ChannelModel.update(updatedChannel);
    }

    async function deleteById(info) {
        if (!info.id || info.id.length === 0 || !cuid.isCuid(info.id)) {
            throw new Error('Invalid id.');
        }

        // Check if channel exist
        const channel = await ChannelModel.findById(info.id);
        if (!channel) {
            throw new Error('Channel not found.');
        }

        // Make channel
        const foundChannel = makeChannels(channel);

        // Check authorization to delete channel
        if (foundChannel.getAdminId() !== info.currentUserId) {
            throw new Error('Unauthorization.');
        }

        // Delete all messages in channel
        await MessageModel.deleteByChannelId(foundChannel.getId());

        // Delete channel
        return ChannelModel.deleteById(foundChannel.getId());
    }
}

module.exports = makeChannelService;
