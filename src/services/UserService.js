'use strict';

// Require packages
const bcrypt = require('bcryptjs');
const cuid = require('cuid');
const jwt = require('jsonwebtoken');

const { makeUsers } = require('../entities/index');

function makeUserService({ UserModel }) {
    return Object.freeze({
        findAll,
        findById,
        signUp,
        signIn,
        update,
        changePassword,
        deleteById
    });

    function findAll() {
        return UserModel.findAll();
    }

    async function findById(id) {
        if (!id || id.length === 0 || !cuid.isCuid(id)) {
            throw new Error('Invalid id.');
        }

        const user = await UserModel.findById(id);

        if (!user) {
            throw new Error('User not found.');
        }

        return user;
    }

    async function signUp(info) {
        if (info.name === null || info.name.length === 0) {
            throw new Error('Name is mandatory.');
        }

        if (info.username === null || info.username.length === 0) {
            throw new Error('Username is mandatory.');
        }

        if (info.password === null || info.password.length === 0) {
            throw new Error('Password is mandatory.');
        }

        const user = await UserModel.findByUsername(info.username);
        
        if (user) {
            throw new Error('Username has been used.');
        }

        const updatedInfo = Object.assign({}, info);

        updatedInfo.password = bcrypt.hashSync(info.password, bcrypt.genSaltSync());

        const newUser = entities.makeUsers(updatedInfo);

        return UserModel.create(newUser);
    }

    async function signIn(info) {
        if (!info.username || info.username.length === 0) {
            throw new Error('Invalid username.');
        }

        if (!info.password || info.password.length === 0) {
            throw new Error('Invalid password.');
        }

        const user = await UserModel.findByUsername(info.username);

        if (!user) {
            throw new Error('Wrong username or password.');
        }
        
        const foundUser = makeUsers(user);

        const valid = bcrypt.compareSync(info.password, foundUser.getPassword());
        
        if (!valid) {
            throw new Error('Wrong username or password.');
        }

        const token = jwt.sign({ id: foundUser.getId() }, 'secret', { expiresIn: 60 * 60 }); // 1 hour
        
        return token;
    }

    async function update(info) {
        if (!info.id || info.id.length === 0 || !cuid.isCuid(info.id)) {
            throw new Error('Invalid id.');
        }

        if (!info.newName || info.newName.length === 0) {
            throw new Error('Invalid name.');
        }

        const user = await UserModel.findById(info.id);

        if (!user) {
            throw new Error('User not found.');
        }

        const updatedUser = makeUsers(user);

        updatedUser.updateName(info.newName);

        return UserModel.update(updatedUser);
    }

    async function changePassword(info) {
        if (!info.id || info.id.length === 0 || !cuid.isCuid(info.id)) {
            throw new Error('Invalid id.');
        }

        if (!info.newPassword || info.newPassword.length === 0) {
            throw new Error('Invalid password');
        }

        const user = await UserModel.findById(info.id);

        if (!user) {
            throw new Error('User not found.');
        }

        const hashedNewPassword = bcrypt.hashSync(info.newPassword, bcrypt.genSaltSync());

        const updatedUser = makeUsers(user);

        updatedUser.updatePassword(hashedNewPassword);

        return UserModel.update(updatedUser);
    }

    async function deleteById(id) {
        if (!id || id.length === 0 || !cuid.isCuid(id)) {
            throw new Error('Invalid id.');
        }

        const user = await UserModel.findById(id);

        if (!user) {
            throw new Error('User not found.');
        }

        return UserModel.deleteById(id);
    }
};

module.exports = makeUserService;
