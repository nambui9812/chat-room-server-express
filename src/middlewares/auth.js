'use strict';

// Require packages
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');

    try {
        const decoded = jwt.verify(token, 'secret');

        res.locals.currentUserId = decoded.currentUserId;
        next();
    }
    catch(err) {
        res.status(404).json({ message: 'Unauthorization.' });
    }
};

module.exports = auth;
