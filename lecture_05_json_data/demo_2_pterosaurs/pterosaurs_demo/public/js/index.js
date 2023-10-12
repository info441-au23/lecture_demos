async function showDinosaurs() {
    const response = await fetch('/api');
    const text = await response.text();
    const data = JSON.parse(text);
    const asHtml = data.map((dino) => {
        return `
            <h4>${dino.Genus}</h4>
            <p>Author ${dino.Authors}</p>
            <img src='${dino.img}'>
            <hr />
        `
    });

    document.getElementById('results').innerHTML = asHtml.join('');
}