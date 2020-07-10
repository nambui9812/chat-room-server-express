'use strict';

function buildMakeRooms({ Id }) {
    return function makeRooms({
        id = Id.getId(),
        adminId,
        createdDate = (new Date()).toISOString().slice(0, 19).replace('T', ' ')
    } = {}) {
        const updateAdminId = (newAdminId) => {
            adminId = newAdminId;
        }

        return Object.freeze({
            getId: () => id,
            getAdminId: () => adminId,
            getCreatedDate: () => createdDate,
            updateAdminId
        });
    };
};

module.exports = buildMakeRooms;
