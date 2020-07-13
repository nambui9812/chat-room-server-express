'use strict';

function buildMakeMembers ({ Id }) {
    return function makeMembers({
        id = Id.getId(),
        userId,
        roomId,
        name,
        createdDate = (new Date()).toISOString().slice(0, 19).replace('T', ' ')
    } = {}) {
        // Role is 'member' as default
        let role = 'member';

        const updateName = (newName) => {
            name = newName;
        }

        const updateRole = (newRole) => {
            if (newRole !== 'member' || newRole !== 'moderator') {
                throw new Error('Invalid role.');
            }
        }

        return Object.freeze({
            getId: () => id,
            getUserId: () => userId,
            getRoomId: () => roomId,
            getName: () => name,
            getRole: () => role,
            getCreatedDate: () => createdDate,
            updateName,
            updateRole
        });
    };
};

module.exports = buildMakeMembers;
