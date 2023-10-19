import express from 'express';
import spies from './api/spies.js';
const router = express.Router();

router.use('/spies', spies);

export default router;
