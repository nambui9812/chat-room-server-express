'use strict';

// Require packages
const cuid = require('cuid');
const bcrypt = require('bcryptjs');

// Require entities
const buildMakeUsers = require('./users');
const buildMakeRooms = require('./rooms');
const buildMakeChannels = require('./channels');

const Id = Object.freeze({
    getId: () => cuid()
});

const makeUsers = buildMakeUsers({ Id });
const makeRooms = buildMakeRooms({ Id });
const makeChannels = buildMakeChannels({ Id });

module.exports = Object.freeze({
    makeUsers,
    makeRooms,
    makeChannels
});
