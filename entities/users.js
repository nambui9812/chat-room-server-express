'use strict';

function buildMakeUsers ({ Id }) {
    return function makeUsers({
        id = Id.getId(),
        name,
        username,
        password,
        createdDate = (new Date()).toISOString().slice(0, 19).replace('T', ' ')
    } = {}) {

        const updateName = (newName) => {
            name = newName;
        }

        const updatePassword = (newPassword) => {
            password = newPassword;
        }

        return Object.freeze({
            getId: () => id,
            getName: () => name,
            getUsername: () => username,
            getPassword: () => password,
            getCreatedDate: () => createdDate,
            updateName,
            updatePassword
        });
    };
};

module.exports = buildMakeUsers;
