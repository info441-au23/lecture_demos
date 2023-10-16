async function postUser() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;

    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            firstName,
            lastName,
            email
        }),
        headers: { // required to get express to automatically parse the body
            'Content-Type': 'application/json'
        }
    });
    const data = await response.text();
}

async function getUsers(){
    const response = await fetch('/api/users');
    const raw = await response.text();
    const asJson = JSON.parse(raw);

    const asHtmls = asJson.map(({firstName, lastName, email}) => `
        <li>
            <div>First Name: ${firstName}</div>
            <div>Last Name: ${lastName}</div>
            <div>Email: ${email}</div>
        </li>
    `);

    document.getElementById('results').innerHTML = `
        <h4>Users (${asHtmls.length}):</h4>
        <ul>
            ${asHtmls.join('')}
        </ul>
    `;
}
