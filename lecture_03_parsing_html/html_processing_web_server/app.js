import express from 'express';
import { auditUrl } from './lib.js';

const port = 4000;
const app = express();

app.use(express.static('public'));

app.get('/api/runAudit', async (req, res) => {
    res.type('html');
    const url = req.query.url;
    const imageTagInfo = await auditUrl(url);
    const asHtmls = imageTagInfo.map((info) => {
        return `
            <ul>
              <li>Index: ${info.index}</li>
              <li>Src: ${info.src}</li>
              <li>Alt: ${info.alt}</li>
            </ul>
        `;
    });
    
    // Turns the array of html snippets into one html string
    let asHtml = asHtmls.join('');
    asHtml += `<div>Found total ${asHtmls.length} images</div>`;
    
    res.send(asHtml);
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})