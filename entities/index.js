'use strict';

// Require entities
const buildMakeUsers = require('./users');

const makeUsers = buildMakeUsers();

module.exports = Object.freeze({
    makeUsers
});
