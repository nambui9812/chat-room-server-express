'use strict';

// Require packages
const cuid = require('cuid');
const { makeRooms } = require('../entities/index');

function makeRoomService({ RoomModel, ChannelModel, MessageModel, MemberModel }) {
    return Object.freeze({
        findAll,
        findAllByAdminId,
        findById,
        create,
        updateAdmin,
        deleteById
    });

    function findAll() {
        return RoomModel.findAll();
    }

    function findAllByAdminId(adminId) {
        return RoomModel.findAllByAdminId(adminId);
    }

    async function findById(id) {
        if (!id || id.length === 0 || !cuid.isCuid(id)) {
            throw new Error('Invalid id.');
        }

        // Check if room exist
        const room = await RoomModel.findById(id);
        if (!room) {
            throw new Error('Room not found.');
        }

        return room;
    }

    async function create(info) {
        if (!info.currentUserId || info.currentUserId.length === 0 || !cuid.isCuid(info.currentUserId)) {
            throw new Error('Invalid admin id.');
        }

        // Map to make room
        info.adminId = info.currentUserId;

        // Make room
        const newRoom = makeRooms(info);

        // Create
        return RoomModel.create(newRoom);
    }

    async function updateAdmin(info) {
        if (!info.id || info.id.length === 0 || !cuid.isCuid(info.id)) {
            throw new Error('Invalid id.');
        }

        if (!info.newAdminId || info.newAdminId.length === 0 || !cuid.isCuid(info.newAdminId)) {
            throw new Error('Invalid admin id.');
        }

        // Check if room exist
        const foundRoom = await RoomModel.findById(info.id);
        if (!foundRoom) {
            throw new Error('Room not found.');
        }

        // Make room
        const updatedRoom = makeRooms(foundRoom);

        // Check authorization to update room
        if (updatedRoom.getAdminId() !== info.currentUserId) {
            throw new Error('Unauthorization.');
        }

        // Update
        updatedRoom.updateAdminId(info.newAdminId);

        // Save
        return RoomModel.updateAdmin(updatedRoom);
    }

    async function deleteById(info) {
        if (!info.id || info.id.length === 0 || !cuid.isCuid(info.id)) {
            throw new Error('Invalid id.');
        }

        if (!info.currentUserId || info.currentUserId.length === 0 || !cuid.isCuid(info.currentUserId)) {
            throw new Error('Unauthorization.');
        }

        // Check if room exist
        const room = await RoomModel.findById(info.id);
        if (!room) {
            throw new Error('Room not found.');
        }

        // Make room
        const foundRoom = makeRooms(room);

        // Check authorization to delete room
        if (foundRoom.getAdminId() !== info.currentUserId) {
            throw new Error('Unauthorization.');
        }

        // Delete all messages in room
        await MessageModel.deleteByRoomId(foundRoom.getId());

        // Delete all channels in room
        await ChannelModel.deleteByRoomId(foundRoom.getId());

        // Delete all members in room
        await MemberModel.deleteByRoomId(foundRoom.getId());

        // Delete room
        return RoomModel.deleteById(foundRoom.getId());
    }
}

module.exports = makeRoomService;
