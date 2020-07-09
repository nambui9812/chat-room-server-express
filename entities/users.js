'use strict';

function buildMakeUsers ({ Id }) {
    return function makeUsers({
        id = Id.getId(),
        name,
        username,
        password,
        createdDate = (new Date()).toISOString().slice(0, 19).replace('T', ' ')
    } = {}) {

        return Object.freeze({
            getId: () => id,
            getName: () => name,
            getUsername: () => username,
            getPassword: () => password,
            getCreatedDate: () => createdDate
        });
    };
};

module.exports = buildMakeUsers;
