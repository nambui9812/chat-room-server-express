'use strict';

// Require packages
const cuid = require('cuid');
const { makeRooms, makeMembers } = require('../entities/index');

function makeMemberService({ UserModel, RoomModel, MemberModel }) {
    return Object.freeze({
        findAll,
        findAllByRoomId,
        findById,
        create,
        update,
        deleteById
    });

    function findAll() {
        return MemberModel.findAll();
    }

    async function findAllByRoomId(info) {
        if (!info.currentUserId || info.currentUserId.length === 0 || !cuid.isCuid(info.currentUserId)) {
            throw new Error('Invalid user id');
        }

        if (!info.roomId || info.roomId.length === 0 || !cuid.isCuid(info.roomId)) {
            throw new Error('Invalid room id');
        }

        // Check if room exist
        const foundRoom = await RoomModel.findById(info.roomId);

        if (!foundRoom) {
            throw new Error('Room not found.');
        }

        // Make room
        const room = makeRooms(foundRoom);

        // Check if current user is admin or member of this room
        const foundMember = await MemberModel.findByUserIdAndRoomId(info.currentUserId, room.getId());

        if (room.getAdminId() !== info.currentUserId && !foundMember) {
            throw new Error('User has not been in room.');
        }

        return MemberModel.findAllByRoomId(info.roomId);
    }

    async function findById(id) {
        if (!id || id.length === 0 || !cuid.isCuid(id)) {
            throw new Error('Invalid id.');
        }

        // Check if member exist
        const member = await MemberModel.findById(id);
        if (!member) {
            throw new Error('Member not found.');
        }

        return member;
    }

    async function create(info) {
        if (!info.currentUserId || info.currentUserId.length === 0 || !cuid.isCuid(info.currentUserId)) {
            throw new Error('Invalid user id.');
        }

        if (!info.roomId || info.roomId.length === 0 || !cuid.isCuid(info.roomId)) {
            throw new Error('Invalid roomId id.');
        }

        if (!info.name || info.name.length === 0) {
            throw new Error('Invalid name.');
        }

        // Map to make member
        info.userId = info.currentUserId;

        // Checked if user exist
        const foundUser = await UserModel.findById(info.userId);
        if (!foundUser) {
            throw new Error('User not found.;')
        }

        // Check if room exist
        const foundRoom = await RoomModel.findById(info.roomId);
        if (!foundRoom) {
            throw new Error('Room not found.');
        }

        // Make room
        const room = makeRooms(foundRoom);

        // Check if user is admin
        if (room.getAdminId() === info.userId) {
            throw new Error('User is admin of room already.');
        }

        // Check if member exist
        const foundMember = await MemberModel.findByUserIdAndRoomId(info.userId, info.roomId);
        if (foundMember) {
            throw new Error('User has been in room already.');
        }

        // Make member
        const member = makeMembers(info);

        const newMember = await MemberModel.create(member)

        return {
            room: foundRoom,
            member: newMember
        };
    }

    async function update(info) {
        if (!info.id || info.id.length === 0 || !cuid.isCuid(info.id)) {
            throw new Error('Invalid user id.');
        }

        if (!info.currentUserId || info.currentUserId.length === 0 || !cuid.isCuid(info.currentUserId)) {
            throw new Error('Invalid user id.');
        }

        if (!info.newName || info.newName.length === 0) {
            throw new Error('Invalid new name.');
        }

        // Check if member exist
        const foundMember = await MemberModel.findById(info.id);
        if (!foundMember) {
            throw new Error('Member not found.');
        }

        // Make member
        const updatedMember = makeMembers(foundMember);

        // Check authorization to update member
        if (updatedMember.getUserId() !== info.currentUserId) {
            throw new Error('Unauthorization.');
        }

        // Update
        updatedMember.updateName(info.newName);

        // Save
        return MemberModel.update(updatedMember);
    }

    async function deleteById(info) {
        if (!info.id || info.id.length === 0 || !cuid.isCuid(info.id)) {
            throw new Error('Invalid id.');
        }

        if (!info.currentUserId || info.currentUserId.length === 0 || !cuid.isCuid(info.currentUserId)) {
            throw new Error('Unauthorization.');
        }

        // Check if member exist
        const foundMember = await MemberModel.findById(info.id);
        if (!foundMember) {
            throw new Error('Member not found.');
        }

        // Make member
        const member = makeMembers(foundMember);

        // Find the room, dont need to check exist here
        const foundRoom = await RoomModel.findById(member.getRoomId());

        // Make room
        const room = makeRooms(foundRoom);

        // Check authorization to delete member
        if (member.getUserId() !== info.currentUserId && room.getAdminId() !== info.currentUserId) {
            throw new Error('Unauthorization.');
        }

        return MemberModel.deleteById(member.getId());
    }
}

module.exports = makeMemberService;
