import { parse } from 'node-html-parser';
import fetch from 'node-fetch';

export async function auditUrl(url) {
    const response = await fetch(url);
    const htmlText = await response.text();

    const html = parse(htmlText);
    const imageTags = html.querySelectorAll('img');

    return imageTags.map((imageTag, index) => {
        return {
            index: index,
            src: imageTag.attributes.src,
            alt: imageTag.attributes.alt,
        };
    });
}