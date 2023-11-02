import express from 'express';
import usersRouter from './api/users.js';
import playlistsRouter from './api/playlists.js';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/playlists', playlistsRouter);

export default router;