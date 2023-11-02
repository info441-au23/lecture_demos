import express from 'express';
import User from '../../models/user.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find();
    res.json({status: 'ok', users});
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    const user = new User({name});
    await user.save();
    res.json({status: 'ok'});
});

router.post('/bands', async (req, res) => {
    const { id, band } = req.body;
    const user = await User.findById(id);
    user.bands.push(band);
    await user.save();
    res.json({status: 'ok'});
});

router.delete('/', async (req, res) => {
    const { id } = req.body;
    const user = await User.findById(id);
    await user.deleteOne();
    res.json({status: 'ok'});
});

export default router;