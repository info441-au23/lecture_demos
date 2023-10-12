import express from 'express';
import userRouter from './api/users.js';

const router = express.Router();
router.use('/users', userRouter);

export default router;