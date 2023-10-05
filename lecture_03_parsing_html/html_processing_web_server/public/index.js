async function runAudit() {
    const requestedUrl = document.getElementById('requestedUrl').value;
    const response = await fetch(`api/runAudit?url=${requestedUrl}`);
    const content = await response.text();
    document.getElementById('results').innerHTML = content;
}