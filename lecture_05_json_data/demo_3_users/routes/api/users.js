import express from 'express';
import { promises as fs } from 'fs';

const DATA_FILE = 'data/users.json';

const router = express.Router();

router.get('/', async (req, res) => {
    const data = await getData();
    res.json(data);
});

router.post('/', async (req, res) => {
    const body = req.body;
    const data = await getData();
    data.push(body);
    await fs.writeFile(DATA_FILE, JSON.stringify(data));
    res.json({success: true});
});

async function getData() {
    const raw = await fs.readFile(DATA_FILE);
    const data = JSON.parse(raw); 
    return data;
}
export default router;