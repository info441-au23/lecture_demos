const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.send('Hello INFO441!');
});

app.listen(port, () => console.log(`Listening at http://localhost/${port}`));