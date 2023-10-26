import 'dotenv/config';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';

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
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // set this to true on production
        maxAge: oneDay,
    }
}));

app.get('/', (req, res) => {
    let bodyContent;
    
    if(req.session.isAuthenticated) {
        bodyContent = `
                <div>isAuthenticated: ${req.session.isAuthenticated}</div>
                <div>username: ${req.session.account?.username}</div>
                <div><a href="/users/id">See ID Information</div>
                <div><a href="/auth/acquireToken">See Profile Information</div>
                <br>
                <div><a href="/auth/signout">Sign out</div>
                `;
    } else {
        bodyContent = `<a href="/auth/signin">Sign in</a>`
    }

    const html = `
        <html>
            <head>Testing Azure</head>
            <body>
                <h1>MSAL Node & Express App Login</h1>
                ${bodyContent}
            </body>
        </html>
    `
    res.type('html');
    res.send(html);
});

app.use('/users', usersRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(
        `<html>
            <body>
                <h1 style='color: red'>Error!</h1>
                <h2>Message</h2>
                <p>${err.message}</p>
                <h4>Full Details</h4>
                <p>${JSON.stringify(err, null, 2)}</p>
            </body>
        </html>
        `
    );
});

export default app;
