'use strict';

const express = require('express');
const { RoomService } = require('../services/index');
const auth = require('../middlewares/auth');

const router = express.Router();

/**
 * Checked api
 */
router.get('/', async (req, res) => {
    try {
        const rooms = await RoomService.findAll();
        
        res.status(200).json({
            messages: 'Get all rooms successfully.',
            data: rooms
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot get all rooms.' });
    }
});

/**
 * Checked api
 */
router.get('/:id', async (req, res) => {
    try {
        const room = await RoomService.findById(req.params.id);

        res.status(200).json({
            messages: 'Get room successfully.',
            data: room
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot get all rooms.' });
    }
});

/**
 * Checked api
 */
router.post('/create', auth, async (req, res) => {
    try {
        // Add id from auth middleware to req body
        req.body.currentUserId = res.locals.currentUserId;
        
        const room = await RoomService.create(req.body);
        
        res.status(200).json({
            messages: 'Create new room successfully.',
            data: room
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot create new room.' });
    }
});

router.put('/update-admin', auth, async (req, res) => {
    try {
        // Add id from auth middleware to req body
        req.body.currentUserId = res.locals.currentUserId;

        const room = await RoomService.updateAdmin(req.body);

        res.status(200).json({
            messages: 'Update room successfully.',
            data: room
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot update room.' });
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

        await RoomService.deleteById(info);

        res.status(200).json({ messages: 'Delete room successfully.' });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot delete room.' });
    }
});

module.exports = router;
