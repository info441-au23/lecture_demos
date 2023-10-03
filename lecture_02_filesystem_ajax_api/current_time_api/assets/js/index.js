async function checkTime() {
    const time = await fetch('/api/current_time');
    const container = document.getElementById('current_time_container');
    console.log(time);
    container.innerHTML = time.text();
}