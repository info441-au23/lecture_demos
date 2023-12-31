import { getDb } from '../../models/db.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const {search} = req.query;
        const db = await getDb();
        const spies = await db.all(`select * from spies where first_name = :search`, {':search': search});
        res.json({success: true, spies});
    } catch(error) {
        res.json({success: false, error: error.message});
    }
});

export default router;