'use strict';

function buildMakeChannels({ Id }) {
    return function makeChannels({
        id = Id.getId(),
        roomId,
        adminId,
        name,
        createdDate = (new Date()).toISOString().slice(0, 19).replace('T', ' ')
    } = {}) {
        const updateName = (newName) => {
            name = newName;
        }

        return Object.freeze({
            getId: () => id,
            getRoomId: () => roomId,
            getAdminId: () => adminId,
            getName: () => name,
            getCreatedDate: () => createdDate,
            updateName
        });
    };
};

module.exports = buildMakeChannels;
