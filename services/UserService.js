'use strict';

const entities = require('../entities/index');

function makeUserService({ UserModel }) {
    return Object.freeze({
        findAll,
        signUp,
        update,
        changePassword,
        deleteByUsername
    });

    function findAll() {
        return UserModel.findAll();
    }

    function signUp(info) {
        const newUser = entities.makeUsers(info);

        return UserModel.signUp(newUser);
    }

    function update(info) {
        return UserModel.update(info);
    }

    function changePassword(info) {
        return UserModel.changePassword(info);
    }

    function deleteByUsername(username) {
        return UserModel.deleteByUsername(username);
    }
};

module.exports = makeUserService;
