async function pluralize() {
    const word = document.getElementById('wordInput').value;
    const response = await fetch(`pluralize?word=${word}`);

    const resultSpan = document.getElementById('result');
    resultSpan.innerHTML = await response.text();
}