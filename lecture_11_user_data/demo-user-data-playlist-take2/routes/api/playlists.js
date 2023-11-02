import express from 'express';
import Playlist from '../../models/playlist.js';

const router = express.Router();

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const playlists = await Playlist.find({userId});
    res.json({status: 'ok', playlists });
});

router.post('/:userId', async (req, res) => {
    const { title, songs } = req.body;
    const { userId } = req.params;
    
    const playlist = new Playlist({
        userId,
        title,
        songs,
    });
    await playlist.save();
    const playlists = await Playlist.find({userId});
    res.json({status: 'ok', playlists});
});

export default router;