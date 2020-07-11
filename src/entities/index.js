'use strict';

// Require packages
const cuid = require('cuid');

// Require entities
const buildMakeUsers = require('./users');
const buildMakeRooms = require('./rooms');
const buildMakeChannels = require('./channels');
const buildMakeMembers = require('./members');
const buildMakeMessages = require('./messages');

const Id = Object.freeze({
    getId: () => cuid()
});

const makeUsers = buildMakeUsers({ Id });
const makeRooms = buildMakeRooms({ Id });
const makeChannels = buildMakeChannels({ Id });
const makeMembers = buildMakeMembers({ Id });
const makeMessages = buildMakeMessages({ Id });

module.exports = Object.freeze({
    makeUsers,
    makeRooms,
    makeChannels,
    makeMembers,
    makeMessages
});
