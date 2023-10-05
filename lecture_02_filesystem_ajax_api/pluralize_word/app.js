// The following lines are going to change for the new module style
// const express = require('express');
// const fs = require('fs').promises;

// Standard import statement, we're going to import the whole thing
import express from 'express';
// Selective import, we're only going to import the "promises" part of the library
import { promises as fs } from 'fs';
import pluralize from 'pluralize';

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
    res.type('javascript');
    const content = await fs.readFile('./assets/js/index.js');
    res.send(content);
});

app.get('/pluralize', (req, res) => {
    const word = req.query.word;
    res.type('text');
    res.send(pluralize(word));
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});