'use strict';

const makeUserService = require('./UserService');
const makeRoomService = require('./RoomService');
const makeChannelService = require('./ChannelService');

const UserModel = require('../data-access/UserModel')();
const RoomModel = require('../data-access/RoomModel')();
const ChannelModel = require('../data-access/ChannelModel')();

const UserService = makeUserService({ UserModel });
const RoomService = makeRoomService({ RoomModel, ChannelModel });
const ChannelService = makeChannelService({ RoomModel, ChannelModel });

module.exports = Object.freeze({
    UserService,
    RoomService,
    ChannelService
});
