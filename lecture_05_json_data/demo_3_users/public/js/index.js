async function pushUser() {
    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({"name": "INFO441"})
    });
    const data = await response.text();
    console.log(data);
}