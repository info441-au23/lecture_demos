const express = require('express');
const fs = require('fs');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.type('html');
    const content = fs.readFileSync('./assets/html/index.html');
    res.send(content);
});

app.get('/styles.css', (req, res) => {
    res.type('css');
    const content = fs.readFileSync('./assets/css/styles.css');
    res.send(content);
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});