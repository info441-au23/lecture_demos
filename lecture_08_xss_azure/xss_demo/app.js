import express from 'express'
import fetch from 'node-fetch';
import sanitizeHtml from 'sanitize-html';
import { parse } from 'node-html-parser';

const app = express();
app.use(express.static('public'));

/*
// More manual version of sanitizing HTML
const escapeHTML = str => str.replace(/[&<>'"]/g, 
  tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag]));
    */

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
    res.send(sanitizeHtml(myReturn.join('')));
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
});
