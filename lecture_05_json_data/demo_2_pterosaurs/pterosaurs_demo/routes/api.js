import express from 'express';
import {promises as fs} from 'fs';

const router = express.Router();

router.get('/', async (req, res) => {
    const raw = await fs.readFile('data/pterosaur.json');
    const data = JSON.parse(raw);
    const withImage = data.filter((dino) => !!dino.img);
    
    res.json(withImage);
});


export default router;