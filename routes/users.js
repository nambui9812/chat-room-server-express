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

router.post('/sign-up', async (req, res) => {
    try {
        const user = await UserService.signUp(req.body);
        
        res.status(200).json({
            messages: ['Create new user successfully.'],
            data: user
        });
    }
    catch(err) {
        res.status(404).json({ messages: ['Cannot sign up.'] });
    }
});

router.delete('/delete/:username', async (req, res) => {
    try {
        await UserService.deleteByUsername(req.params.username);

        res.status(200).json({ messages: ['Delete user successfully.'] });
    }
    catch(err) {
        res.status(404).json({ messages: ['Cannot delete user.'] });
    }
});

module.exports = router;
