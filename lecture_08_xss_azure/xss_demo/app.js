import express from 'express'
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

const app = express();
app.use(express.static('public'));

app.get('/og-tags', async (req, res) => {
    const { page } = req.query;
    const pageResponse = await fetch(page);
    const asText = await pageResponse.text();
    const html = parse(asText);
    const tags = html.querySelectorAll('meta[property^="og"]');

    res.type('html');
    const myReturn = tags.map((tag) => {
        return `<h4>${tag.getAttribute('property')}</h4>
            <div>${tag.getAttribute('content')}</div>
        `;
    });
    res.send(myReturn.join(''));
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
});
