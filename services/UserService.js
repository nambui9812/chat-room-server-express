'use strict';

const entities = require('../entities/index');

function makeUserService({ UserModel }) {
    return Object.freeze({
        findAll,
        signUp,
        deleteByUsername
    });

    function findAll() {
        return UserModel.findAll();
    }

    function signUp(info) {
        const newUser = entities.makeUsers(info);

        return UserModel.signUp(newUser);
    }

    function deleteByUsername(username) {
        return UserModel.deleteByUsername(username);
    }
};

module.exports = makeUserService;
