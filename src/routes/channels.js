'use strict';

const express = require('express');
const { ChannelService } = require('../services/index');
const auth = require('../middlewares/auth');

const router = express.Router();

/**
 * Checked api
 */
router.get('/', async (req, res) => {
    try {
        const channels = await ChannelService.findAll();
        
        res.status(200).json({
            messages: 'Get all channels successfully.',
            data: {
                channels
            }
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot get all channels.' });
    }
});

router.get('/room/:roomId', auth, async (req, res) => {
    try {
        // Get all info
        const info = {
            currentUserId: res.locals.currentUserId,
            roomId: req.params.roomId
        };

        const channels = await ChannelService.findAllByRoomId(info);
        
        res.status(200).json({
            messages: 'Get all channels in room successfully.',
            data: {
                channels
            }
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot get all channels in room.' });
    }
});

/**
 * Checked api
 */
router.get('/:id', auth, async (req, res) => {
    try {
        const channel = await ChannelService.findById(req.params.id);

        res.status(200).json({
            messages: 'Get channel successfully.',
            data: {
                channel
            }
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot get channel.' });
    }
});

/**
 * Checked api
 */
router.post('/create', auth, async (req, res) => {
    try {
        // Add id from auth middleware to req body
        req.body.currentUserId = res.locals.currentUserId;

        const channel = await ChannelService.create(req.body);
        
        res.status(200).json({
            messages: 'Create new channel successfully.',
            data: {
                channel
            }
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot create new channel.' });
    }
});

router.put('/update', auth, async (req, res) => {
    try {
        // Add id from auth middleware to req body
        req.body.currentUserId = res.locals.currentUserId;

        const channel = await ChannelService.update(req.body);

        res.status(200).json({
            messages: 'Update channel successfully.',
            data: {
                channel
            }
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot update channel.' });
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

        await ChannelService.deleteById(info);

        res.status(200).json({ messages: 'Delete channel successfully.' });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot delete channel.' });
    }
});

module.exports = router;
