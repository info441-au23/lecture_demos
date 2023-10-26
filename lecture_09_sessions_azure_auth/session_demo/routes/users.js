import express from 'express';
const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if(username == 'tejus' && password == '1234') {
        req.session.username = username;
        req.session.specialMessage = 'Could not make it to class';
        res.send('successfully logged in');
    } else if (username == 'jamesbond' && password == 'l2k007') {
        req.session.username = username;
        req.session.specialMessage = 'When the crow flies at midnight, the eagle as landed';
        res.send('successfully logged in');
    } else {
        res.send('invalid user!');
    }
});

router.post('/logout', (req, res) => {
    console.log('logged out');
    req.session.destroy();
    res.send('successfully logged out');
});

router.get('/special', (req, res) => {
    const {username, specialMessage } = req.session;

    if(username) {
        res.send(`Hi ${username}, ${specialMessage}.`);
    } else {
        res.send('no special data available');
    }
});

export default router;