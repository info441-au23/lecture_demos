import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log("In middleware function 1");
    next();
});

app.use((req, res, next) => {
    req.userId = 1;
    next();
});

app.use((req, res, next) => {
    console.log(`My user id is ${req.userId}`);
    next();
});

app.get('/test_route', (req, res) => {
    res.send('Test Data');
});

export default app;
