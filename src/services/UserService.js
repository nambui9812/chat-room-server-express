'use strict';

// Require packages
const bcrypt = require('bcryptjs');
const cuid = require('cuid');
const jwt = require('jsonwebtoken');

const entities = require('../entities/index');
const { makeUsers } = require('../entities/index');

function makeUserService({ UserModel }) {
    return Object.freeze({
        findAll,
        findById,
        signUp,
        signIn,
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

        return UserModel.signUp(newUser);
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

        const updatedUser = makeUsers(user);

        updatedUser.updateName(info.name);

        return UserModel.changeName(updatedUser);
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

        const hashedNewPassword = bcrypt.hashSync(info.password, bcrypt.genSaltSync());

        const updatedUser = makeUsers(user);

        updatedUser.updatePassword(hashedNewPassword);

        return UserModel.changePassword(updatedUser);
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
