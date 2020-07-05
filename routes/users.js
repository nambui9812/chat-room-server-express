'use strict';

const express = require('express');
const Services = require('../services/index');
const { UserService } = Services;

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await UserService.findAll();
        
        res.status(200).json({
            messages: ['Get all users successfully.'],
            data: users
        });
    }
    catch(err) {
        res.status(404).json({ messages: ['Cannot get all users.'] });
    }
});

module.exports = router;
