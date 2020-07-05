'use strict';

function buildMakeUsers () {
    return function makeUsers({
        firstName,
        lastName,
        username,
        password,
        createdDate = new Date()
    } = {}) {
        // TODO: Check for firstName, lastName, username, password

        const updateFirstName = (newFirstName) => {
            firstName = newFirstName
        };

        const updateLastName = (newLastName) => {
            lastName = newLastName;
        };

        const updatePassword = (newPassword) => {
            password = newPassword;
        };

        return Object.freeze({
            getFirstName: () => firstName,
            updateFirstName,
            getLastName: () => lastName,
            updateLastName,
            getUsername: () => username,
            getPassword: () => password,
            updatePassword
        });
    };
};

module.exports = buildMakeUsers;
