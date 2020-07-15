'use strict';

function buildMakeRooms({ Id }) {
    return function makeRooms({
        id = Id.getId(),
        adminId,
        name,
        createdDate = (new Date()).toISOString().slice(0, 19).replace('T', ' ')
    } = {}) {

        const updateAdminId = (newAdminId) => {
            adminId = newAdminId;
        }

        const updateName = (newName) => {
            name = newName;
        }

        return Object.freeze({
            getId: () => id,
            getAdminId: () => adminId,
            getName: () => name,
            getCreatedDate: () => createdDate,
            updateAdminId,
            updateName
        });
    };
};

module.exports = buildMakeRooms;
