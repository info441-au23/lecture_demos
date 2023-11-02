import express from 'express';
import users from './api/users.js';
import playlists from './api/playlists.js';

const router = express.Router();

router.use('/users', users);
router.use('/playlists', playlists);

export default router;