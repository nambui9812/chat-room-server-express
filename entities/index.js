'use strict';

// Require packages
const cuid = require('cuid');
const bcrypt = require('bcryptjs');

// Require entities
const buildMakeUsers = require('./users');
const { isCuid } = require('cuid');

const Id = Object.freeze({
    getId: () => cuid()
});

const makeUsers = buildMakeUsers({ Id });

module.exports = Object.freeze({
    makeUsers
});
