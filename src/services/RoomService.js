'use strict';

// Require packages
const cuid = require('cuid');
const { makeRooms } = require('../entities/index');

function makeRoomService({ RoomModel }) {
    return Object.freeze({
        findAll,
        findAllByAdminId,
        findById,
        create,
        updateAdminId,
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

        const room = await RoomModel.findById(id);

        if (!room) {
            throw new Error('Room not found.');
        }

        return room;
    }

    async function create(info) {
        if (!info.adminId || info.adminId.length === 0 || !cuid.isCuid(adminId)) {
            throw new Error('Invalid admin id.');
        }

        const newRoom = makeRooms(info);

        await RoomModel.create(newRoom);
    }

    async function updateAdminId(info) {
        if (!info.id || info.id.length === 0 || !cuid.isCuid(id)) {
            throw new Error('Invalid id.');
        }

        if (!info.newAdminId || info.newAdminId.length === 0 || !cuid.isCuid(newAdminId)) {
            throw new Error('Invalid admin id.');
        }

        // Find room
        const foundRoom = await RoomModel.findById(info.id);

        if (!foundRoom) {
            throw new Error('Room not found.');
        }

        const updatedRoom = makeRooms(foundRoom);

        // Check current authorization
        if (updatedRoom.getAdminId !== info.currentUserId) {
            throw new Error('Unauthorization.');
        }

        updatedRoom.updateAdminId(newAdminId);

        // Save
        return RoomModel.update(updatedRoom);
    }

    async function deleteById(info) {
        if (!id || id.length === 0 || !cuid.isCuid(id)) {
            throw new Error('Invalid id.');
        }

        if (!currentUserId || id.currentUserId === 0 || !cuid.isCuid(currentUserId)) {
            throw new Error('Unauthorization.');
        }

        const room = await RoomModel.findById(id);

        if (!room) {
            throw new Error('Room not found.');
        }

        const foundRoom = makeRooms(room);

        // Check current authorization
        if (foundRoom.getAdminId !== info.currentUserId) {
            throw new Error('Unauthorization.');
        }

        return RoomModel.deleteById(foundRoom.getId());
    }
}

module.exports = makeRoomService;
