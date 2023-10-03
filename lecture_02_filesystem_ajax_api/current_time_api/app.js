const express = require('express');
const fs = require('fs').promises;
const app = express();
const port = 4000;

app.get('/', async (req, res) => {
    res.type('html');
    const content = await fs.readFile('./assets/html/index.html');
    res.send(content);
});

app.get('/styles.css', async (req, res) => {
    res.type('css');
    const content = await fs.readFile('./assets/css/styles.css');
    res.send(content);
});

app.get('/index.js', async (req, res) => {
    res.type('js');
    const content = await fs.readFile('./assets/js/index.js');
    res.send(content);
});

app.get('/api/current_time', (req, res) => {
    res.type('text');
    res.send(new Date());
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});