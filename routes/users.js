'use strict';

const express = require('express');
const Services = require('../services/index');
const { UserService } = Services;

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await UserService.findAll();
        
        res.status(200).json({
            messages: 'Get all users successfully.',
            data: users
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot get all users.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await UserService.findById(req.params.id);

        res.status(200).json({
            messages: 'Get user successfully.',
            data: user
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot get all users.' });
    }
});

router.post('/sign-up', async (req, res) => {
    try {
        const user = await UserService.signUp(req.body);
        
        res.status(200).json({
            messages: 'Create new user successfully.',
            data: user
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot sign up.' });
    }
});

router.post('/sign-in', async (req, res) => {
    try {
        const token = await UserService.signIn(req.body);
        
        res.status(200).json({
            messages: 'Sign in successfully.',
            data: token
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot sign in.' });
    }
});

router.put('/change-name', async (req, res) => {
    try {
        const user = await UserService.changeName(req.body);

        res.status(200).json({
            messages: 'Change name of user successfully.',
            data: user
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot change name of user.' });
    }
});

router.put('/change-password', async (req, res) => {
    try {
        const user = await UserService.changePassword(req.body);

        res.status(200).json({
            messages: 'Change password successfully.',
            data: user
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot change password.' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await UserService.deleteById(req.params.id);

        res.status(200).json({ messages: 'Delete user successfully.' });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot delete user.' });
    }
});

module.exports = router;
