'use strict';

const express = require('express');
const { MessageService } = require('../services/index');
const auth = require('../middlewares/auth');

const router = express.Router();

/**
 * Checked api
 */
router.get('/', async (req, res) => {
    try {
        const messages = await MessageService.findAll();
        
        res.status(200).json({
            messages: 'Get all messages successfully.',
            data: messages
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot get all messages.' });
    }
});

router.get('/channel/:channelId', async (req, res) => {
    try {
        const messages = await MessageService.findAllByChannelId(req.params.channelId);
        
        res.status(200).json({
            messages: 'Get all messages in channel successfully.',
            data: messages
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot get all messages in channel.' });
    }
});

/**
 * Checked api
 */
router.get('/:id', async (req, res) => {
    try {
        const message = await MessageService.findById(req.params.id);

        res.status(200).json({
            messages: 'Get message successfully.',
            data: message
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot get message.' });
    }
});

/**
 * Checked api
 */
router.post('/create', auth, async (req, res) => {
    try {
        // Add id from auth middleware to req body
        req.body.currentUserId = res.locals.currentUserId;

        const message = await MessageService.create(req.body);
        
        res.status(200).json({
            messages: 'Create new message successfully.',
            data: message
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot create new message.' });
    }
});

router.put('/update', auth, async (req, res) => {
    try {
        // Add id from auth middleware to req body
        req.body.currentUserId = res.locals.currentUserId;

        const message = await MessageService.update(req.body);

        res.status(200).json({
            messages: 'Update message successfully.',
            data: message
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot update message.' });
    }
});

/**
 * Checked api
 */
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        // Get all info
        const info = {
            currentUserId: res.locals.currentUserId,
            id: req.params.id
        };

        await MessageService.deleteById(info);

        res.status(200).json({ messages: 'Delete message successfully.' });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot delete message.' });
    }
});

module.exports = router;
