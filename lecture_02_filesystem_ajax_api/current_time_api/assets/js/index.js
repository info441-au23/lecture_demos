async function checkTime() {
    const time = await fetch('/api/current_time');
    const textPromise = time.text();
    const container = document.getElementById('current_time_container');
    container.innerHTML = await textPromise;
}