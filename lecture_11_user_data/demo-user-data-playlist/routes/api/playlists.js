import express from 'express';
import Playlist from '../../models/playlists.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const {userId, title, songs} = req.body;
    
    const playlist = new Playlist({userId, title, songs});
    await playlist.save();
    res.send({status: 'ok'});
});

export default router;