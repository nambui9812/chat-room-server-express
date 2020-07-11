'use strict';

const express = require('express');
const { MemberService } = require('../services/index');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const members = await MemberService.findAll();
        
        res.status(200).json({
            messages: 'Get all members successfully.',
            data: members
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot get all members.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const member = await MemberService.findById(req.params.id);

        res.status(200).json({
            messages: 'Get member successfully.',
            data: member
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot get member.' });
    }
});

router.post('/create', auth, async (req, res) => {
    try {
        // Add id from auth middleware to req body
        req.body.currentUserId = res.locals.currentUserId;

        const member = await MemberService.create(req.body);
        
        res.status(200).json({
            messages: 'Create new member successfully.',
            data: member
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot create new member.' });
    }
});

router.put('/update', auth, async (req, res) => {
    try {
        // Add id from auth middleware to req body
        req.body.currentUserId = res.locals.currentUserId;

        const member = await MemberService.update(req.body);

        res.status(200).json({
            messages: 'Update member successfully.',
            data: member
        });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot update member.' });
    }
});

router.delete('/delete/:id', auth, async (req, res) => {
    try {
        // Get all info
        const info = {
            currentUserId: res.locals.currentUserId,
            id: id
        };

        await MemberService.deleteById(info);

        res.status(200).json({ messages: 'Delete member successfully.' });
    }
    catch(err) {
        res.status(404).json({ messages: err.message || 'Cannot delete member.' });
    }
});

module.exports = router;
