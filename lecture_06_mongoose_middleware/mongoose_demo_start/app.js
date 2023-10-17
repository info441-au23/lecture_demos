import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'dotenv/config';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { connect } from './models/mongoose_util.js';
import apiRouter from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
    console.log("MONGO PW:", process.env.MONGO_PW);
    await connect();
    next();
});

app.use('/api', apiRouter);

export default app;
