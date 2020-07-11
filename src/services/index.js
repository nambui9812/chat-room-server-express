'use strict';

const makeUserService = require('./UserService');
const makeRoomService = require('./RoomService');
const makeChannelService = require('./ChannelService');
const makeMemberService = require('./MemberService');

const UserModel = require('../data-access/UserModel')();
const RoomModel = require('../data-access/RoomModel')();
const ChannelModel = require('../data-access/ChannelModel')();
const MemberModel = require('../data-access/MemberModel')();

const UserService = makeUserService({ UserModel });
const RoomService = makeRoomService({ RoomModel, ChannelModel });
const ChannelService = makeChannelService({ RoomModel, ChannelModel });
const MemberService = makeMemberService({ MemberModel });

module.exports = Object.freeze({
    UserService,
    RoomService,
    ChannelService,
    MemberService
});
