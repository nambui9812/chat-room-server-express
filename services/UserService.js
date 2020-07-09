'use strict';

// Require packages
const bcrypt = require('bcryptjs');
const cuid = require('cuid');

const entities = require('../entities/index');
const { isCuid } = require('cuid');

function makeUserService({ UserModel }) {
    return Object.freeze({
        findAll,
        findById,
        signUp,
        changeName,
        changePassword,
        deleteById
    });

    function findAll() {
        return UserModel.findAll();
    }

    async function findById(id) {
        const user = await UserModel.findById(id);

        if (!user) {
            throw new Error('User not found.');
        }

        return user;
    }

    function signUp(info) {
        if (info.name === null || info.name.length === 0) {
            throw new Error('Name is mandatory.');
        }

        if (info.username === null || info.username.length === 0) {
            throw new Error('Username is mandatory.');
        }

        if (info.password === null || info.password.length === 0) {
            throw new Error('Password is mandatory.');
        }

        const updatedInfo = Object.assign({}, info);

        updatedInfo.password = bcrypt.hashSync(info.password, bcrypt.genSaltSync());

        const newUser = entities.makeUsers(updatedInfo);

        return UserModel.signUp(newUser);
    }

    async function changeName(info) {
        if (!info.id || info.id.length === 0 || !cuid(info.id)) {
            throw new Error('Invalid id.');
        }

        if (!info.name || info.name.length === 0) {
            throw new Error('Invalid name.');
        }

        const user = await UserModel.findById(info.id);

        if (!user) {
            throw new Error('User not found.');
        }

        return UserModel.changeName(info);
    }

    async function changePassword(info) {
        if (!info.id || info.id.length === 0 || !cuid(info.id)) {
            throw new Error('Invalid id.');
        }

        if (!info.password || info.password.length === 0) {
            throw new Error('Invalid password');
        }

        const user = await UserModel.findById(info.id);

        if (!user) {
            throw new Error('User not found.');
        }

        const updatedInfo = Object.assign({}, info);

        updatedInfo.password = bcrypt.hashSync(info.password, bcrypt.genSaltSync());

        return UserModel.changePassword(updatedInfo);
    }

    async function deleteById(id) {
        const user = await UserModel.findById(id);

        if (!user) {
            throw new Error('User not found.');
        }

        return UserModel.deleteById(id);
    }
};

module.exports = makeUserService;
