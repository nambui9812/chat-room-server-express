'use strict';

// Require packages
const cuid = require('cuid');
const { makeRooms, makeMembers } = require('../entities/index');

function makeRoomService({ UserModel, RoomModel, ChannelModel, MessageModel, MemberModel }) {
    return Object.freeze({
        findAll,
        findAllByAdminId,
        findAllByUserId,
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

    async function findAllByUserId(userId) {
        // Find all members by userId
        const foundMembers = await MemberModel.findAllByUserId(userId);

        // Make members
        const members = foundMembers.map(foundMember => makeMembers(foundMember));

        // Find all rooms
        const foundRoomsByUserId = [];

        for (let i = 0; i < members.length; ++i) {
            const foundRoom = await RoomModel.findById(members[i].getRoomId());
            
            foundRoomsByUserId.push(foundRoom);
        }

        // Find all room by admin id
        const foundRoomsByAdminId = await RoomModel.findAllByAdminId(userId);

        const foundRooms = foundRoomsByUserId.concat(foundRoomsByAdminId);

        return foundRooms;
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

        // Check if user exist
        const foundUser = await UserModel.findById(info.adminId);
        if (!foundUser) {
            throw new Error('User not found.');
        }

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
