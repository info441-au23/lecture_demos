import express from 'express';
import User from '../../models/users.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find();
    res.json({ status: 'ok', users });
});

router.post('/', async (req, res) => {
    try {
        const {name} = req.body;
        const newUser = new User({name});
        await newUser.save()
        res.json({ status: 'ok', data: newUser._id});
    } catch(error) {
        res.status(500).json({ status: 'error', message: error.message});
    }
});

router.post('/bands', async (req, res) => {
    try {
        const {bands, id} = req.body;
        const user = await User.findById(id);
        user.bands = [...user.bands, ...bands];
        await user.save();
        res.json({ status: 'ok' });
    } catch(error) {
        res.status(500).json({ status: 'error', message: error.message});
    }
});

export default router;