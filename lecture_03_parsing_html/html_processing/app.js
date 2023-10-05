import { parse } from 'node-html-parser';
import fetch from 'node-fetch';

const url = 'https://ischool.uw.edu';

const response = await fetch(url);
const htmlText = await response.text();

const html = parse(htmlText);
const imageTags = html.querySelectorAll('img');

imageTags.forEach((imageTag, index) => {
    console.log(`
        Image ${index}:
          Src: ${imageTag.attributes.src}
          Alt: ${imageTag.attributes.alt}

    `)
})

console.log(`Total images found: ${imageTags.length}`);