'use strict';

// Require packages
const cuid = require('cuid');
const { makeChannels, makeMessages } = require('../entities/index');

function makeMessageService({ RoomModel, ChannelModel, MemberModel, MessageModel }) {
    return Object.freeze({
        findAll,
        findById,
        create,
        update,
        deleteById
    });

    function findAll() {
        return MessageModel.findAll();
    }

    async function findById(id) {
        if (!id || id.length === 0 || !cuid.isCuid(id)) {
            throw new Error('Invalid id.');
        }

        // Check if message exist
        const message = await MessageModel.findById(id);
        if (!message) {
            throw new Error('Message not found.');
        }

        return message;
    }

    async function create(info) {
        if (!info.currentUserId || info.currentUserId.length === 0 || !cuid.isCuid(info.currentUserId)) {
            throw new Error('Invalid user id.');
        }

        if (!info.roomId || info.roomId.length === 0 || !cuid.isCuid(info.roomId)) {
            throw new Error('Invalid roomId id.');
        }

        if (!info.channelId || info.channelId.length === 0 || !cuid.isCuid(info.channelId)) {
            throw new Error('Invalid channel id.');
        }

        if (!info.content || info.content.length === 0) {
            throw new Error('Invalid content.');
        }

        // Map to make message
        info.userId = info.currentUserId;

        // Check if room exist
        const foundRoom = await RoomModel.findById(info.roomId);
        if (!foundRoom) {
            throw new Error('Room not found.');
        }

        // Check if channel exist
        const foundChannel = await ChannelModel.findById(info.channelId);
        if (!foundChannel) {
            throw new Error('Channel not found');
        }

        // Make Channel
        const channel = makeChannels(foundChannel);

        // Check if member exist
        const foundMember = await MemberModel.findByUserIdAndRoomId(info.userId, info.roomId);
        if (!foundMember && info.userId !== channel.getAdminId()) {
            throw new Error('Unauthorization.');
        }

        // Make message
        const newMessage = makeMessages(info);

        return MessageModel.create(newMessage);
    }

    async function update(info) {
        if (!info.id || info.id.length === 0 || !cuid.isCuid(info.id)) {
            throw new Error('Invalid id id.');
        }

        if (!info.currentUserId || info.currentUserId.length === 0 || !cuid.isCuid(info.currentUserId)) {
            throw new Error('Invalid user id.');
        }

        if (!info.newContent || info.newContent.length === 0) {
            throw new Error('Invalid new name.');
        }

        // Check if message exist
        const foundMessage = await MessageModel.findById(info.id);
        if (!foundMessage) {
            throw new Error('Message not found.');
        }

        // Make message
        const updatedMember = makeMessages(foundMessage);

        // Check authorization to update message
        if (updatedMember.getUserId() !== info.currentUserId) {
            throw new Error('Unauthorization.');
        }

        // Update
        updatedMember.updateContent(info.newContent);

        // Save
        return MessageModel.update(updatedMember);
    }

    async function deleteById(info) {
        if (!info.id || info.id.length === 0 || !cuid.isCuid(info.id)) {
            throw new Error('Invalid id.');
        }

        if (!info.currentUserId || info.currentUserId.length === 0 || !cuid.isCuid(info.currentUserId)) {
            throw new Error('Unauthorization.');
        }

        // Check if message exist
        const message = await MessageModel.findById(info.id);
        if (!message) {
            throw new Error('Message not found.');
        }

        // Make message
        const foundMessage = makeMessages(message);

        // Check authorization to delete message
        if (foundMessage.getUserId() !== info.currentUserId) {
            throw new Error('Unauthorization.');
        }

        return MessageModel.deleteById(foundMessage.getId());
    }
}

module.exports = makeMessageService;
