'use strict';

function makeUserService({ UserModel }) {
    return Object.freeze({
        findAll
    });

    function findAll() {
        return UserModel.findAll();
    }
};

module.exports = makeUserService;
