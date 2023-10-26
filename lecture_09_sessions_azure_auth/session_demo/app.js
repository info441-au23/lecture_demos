import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import usersRouter from './routes/users.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const oneDay = 1000 * 60 * 60 * 24;

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessions({
    secret: 'w7OLgEHF4zB+GgjUaJwt/mrdhvmhx8Qa',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use('/users', usersRouter);

export default app;
