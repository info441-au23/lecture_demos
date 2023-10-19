import { getModels } from '../../models/db.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const {search} = req.query;
        const spies = await getModels().Spy.findAll(
            {
                where: {
                    first_name: search
                }
            }
        );
        res.json({success: true, spies});
    } catch(error) {
        res.json({success: false, error: error.message});
    }
});

export default router;