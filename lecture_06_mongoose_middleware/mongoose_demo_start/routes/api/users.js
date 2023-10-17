import express from 'express';
import User from '../../models/user.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.post('/', async (req, res) => {
    const {firstName, lastName, email} = req.body;
    const newUser = new User({firstName, lastName, email});
    await newUser.save();
    res.json({success: true});
});

export default router;
