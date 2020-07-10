'use strict';

const makeUserService = require('./UserService');
const makeRoomService = require('./RoomService');

const UserModel = require('../data-access/UserModel')();
const RoomModel = require('../data-access/RoomModel')();

const UserService = makeUserService({ UserModel });
const RoomService = makeRoomService({ RoomModel });

module.exports = Object.freeze({
    UserService,
    RoomService
});
