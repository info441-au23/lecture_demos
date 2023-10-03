const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.type('html');
    res.send(`
        <html>
           <head>
             <link href="/styles.css" rel='stylesheet' />
           </head>
           <body>
              <h1>Hello INFO441</h1>
           </body>
        </html>
    `)
});

app.get('/styles.css', (req, res) => {
    res.type('css');
    res.send(`
      h1 {
        font-size: 6em;
        color: purple;
      }
    `)
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});