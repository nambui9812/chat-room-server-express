'use strict';

// Require packages
const cuid = require('cuid');
const { makeMembers } = require('../entities/index');

function makeMemberService({ MemberModel }) {
    return Object.freeze({
        findAll,
        findById,
        create,
        update,
        deleteById
    });

    function findAll() {
        return MemberModel.findAll();
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

        if (!info.name || info.name.length === 0 || !cuid.isCuid(info.name)) {
            throw new Error('Invalid name.');
        }

        // Map to make member
        info.userId = info.currentUserId;

        // Make member
        const newMember = makeMembers(info);

        await MemberModel.create(newMember);
    }

    async function update(info) {
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
        if (!id || id.length === 0 || !cuid.isCuid(id)) {
            throw new Error('Invalid id.');
        }

        if (!currentUserId || id.currentUserId === 0 || !cuid.isCuid(currentUserId)) {
            throw new Error('Unauthorization.');
        }

        // Check if member exist
        const member = await MemberModel.findById(id);
        if (!member) {
            throw new Error('member not found.');
        }

        // Make member
        const foundMember = makeMembers(member);

        // Check authorization to delete member
        if (foundMember.getUserId() !== info.currentUserId) {
            throw new Error('Unauthorization.');
        }

        return MemberModel.deleteById(foundMember.getId());
    }
}

module.exports = makeMemberService;
