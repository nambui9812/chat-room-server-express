'use strict';

const makeUserService = require('./UserService');
const makeRoomService = require('./RoomService');
const makeChannelService = require('./ChannelService');
const makeMemberService = require('./MemberService');
const makeMessageService = require('./MessageService');

const UserModel = require('../data-access/UserModel')();
const RoomModel = require('../data-access/RoomModel')();
const ChannelModel = require('../data-access/ChannelModel')();
const MemberModel = require('../data-access/MemberModel')();
const MessageModel = require('../data-access/MessageModel')();

const UserService = makeUserService({ UserModel });
const RoomService = makeRoomService({ RoomModel, ChannelModel, MessageModel, MemberModel });
const ChannelService = makeChannelService({ RoomModel, ChannelModel, MessageModel });
const MemberService = makeMemberService({ MemberModel });
const MessageService = makeMessageService({ RoomModel, ChannelModel, MemberModel, MessageModel });

module.exports = Object.freeze({
    UserService,
    RoomService,
    ChannelService,
    MemberService,
    MessageService
});
