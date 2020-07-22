'use strict';

const express = require('express');
const { UserService } = require('../services/index');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await UserService.findAll();
        
        res.status(200).json({
            messages: 'Get all users successfully.',
            data: {
                users
            }
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot get all users.' });
    }
});

router.get('/user', auth, async (req, res) => {
    try {
        const user = await UserService.findById(res.locals.currentUserId);

        res.status(200).json({
            messages: 'Get user successfully.',
            data: {
                user
            }
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot get user.' });
    }
});

router.post('/sign-up', async (req, res) => {
    try {
        const token = await UserService.signUp(req.body);
        
        res.status(200).json({
            messages: 'Create new user successfully.',
            data: {
                token
            }
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
            data: {
                token
            }
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot sign in.' });
    }
});

router.put('/update', auth, async (req, res) => {
    try {
        // Add id from auth middleware to req body
        req.body.id = res.locals.currentUserId;

        const user = await UserService.update(req.body);

        res.status(200).json({
            messages: 'Update user successfully.',
            data: {
                user
            }
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot update user.' });
    }
});

router.put('/change-password', auth, async (req, res) => {
    try {
        // Add id from auth middleware to req body
        req.body.id = res.locals.currentUserId;

        const user = await UserService.changePassword(req.body);

        res.status(200).json({
            messages: 'Change password successfully.',
            data: {
                user
            }
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot change password.' });
    }
});

/**
 * Need to deal with deleting account later
 * Maybe just allow soft delete
 */
router.delete('/delete', auth, async (req, res) => {
    try {
        await UserService.deleteById(res.locals.currentUserId);

        res.status(200).json({ messages: 'Delete user successfully.' });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot delete user.' });
    }
});


module.exports = router;
