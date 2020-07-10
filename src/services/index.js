'use strict';

const makeUserService = require('./UserService');
const makeUserModel = require('../data-access/UserModel');

const UserModel = makeUserModel();
const UserService = makeUserService({ UserModel });

module.exports = Object.freeze({
    UserService
});
