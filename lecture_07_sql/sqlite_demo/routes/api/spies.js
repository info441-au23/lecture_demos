import { getDb } from '../../models/db.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    res.json({success: false, error: 'not implemented'});
});

export default router;
