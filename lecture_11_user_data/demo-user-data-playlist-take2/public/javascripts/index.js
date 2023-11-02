const usersTemplate = (userInfo) => 
        `<div>
            <h3>
                Username: ${userInfo.name}
                <button onclick="deleteUser('${userInfo._id}')">Delete</button>
            </h3>
            <label>Favorite Bands:</label> ${userInfo.bands.join(", ")} <br>
            <label>Add Band:</label> <input type="text" id="add_band_text_${userInfo._id}" />
            <button onclick="addBand('${userInfo._id}')">Add Band</button>

            <h3>Playlists</h3>
            <div id="playlist_div_${userInfo._id}">Loading playlists...</div>

            <h3>Add Playlist</h3>
            <div>
                <label>Title:</label> <input type="text" id="add_playlist_title_text_${userInfo._id}" />
            </div>
            <div>
                <label>Songs:</label> <input type="text" id="add_playlist_song_text_${userInfo._id}" />
            </div>
            <button onclick="addPlaylist('${userInfo._id}')">Add Playlist</button>
        </div>
        `
;

const playlistTemplate = (playlist) => `
        <div>
            <h4>Playlist: ${playlist.title}</h4>
            <label>Songs:</label> ${playlist.songs}
        </div>
`;

function getById(id) {
    return document.getElementById(id);
}

function getValueById(id) {
    return getById(id).value;
}

function handleError(message, errorDivId) {
    getById(errorDivId).innerHTML = `
        <div style="color: red">${message}</div>
        `;
}

async function fetchJSON(uri, body, options = {method: 'POST'}) {
    const response = await fetch(uri, {
        headers: { // required to get express to automatically parse the body
            'Content-Type': 'application/json'
        },
        ...options,
        body: JSON.stringify(body)
    });

    return response.json()
}

async function addUser() {
    getById('results').innerText = '';

    const name = getValueById('name_input');
    const output = await fetchJSON('/api/users', { name });

    if(output.status === 'ok') {
        getById('results').innerText = 'Saved successfully, reload user list';
    } else {
        handleError(output.errorMessage, 'results');
    }
}

async function loadUsers() {
    const response = await fetch('/api/users');
    const output = await response.json();

    if(output.status === 'ok') {
        getById('allusersdiv').innerHTML = output.users.map(usersTemplate).join('<hr />');
        const promises = output.users.map(async ({_id: userId}) => {
            const response = await fetch(`/api/playlists/${userId}`);
            const output = await response.json();
            getById(`playlist_div_${userId}`).innerHTML = output.playlists.map(playlistTemplate).join('<hr />');
        });

        Promise.all(promises);
    } else {
        handleError(output.errorMessage, 'allusersdiv');
    }
}

async function addBand(id) {
    const band = getValueById(`add_band_text_${id}`)
    const output = await fetchJSON('/api/users/bands', {id, band});

    if(output.status === 'ok') {
        await loadUsers();
    } else {
        handleError(output.errorMessage, 'allusersdiv');
    }   
}

async function deleteUser(id) {
    if(confirm('Are you sure you want to delete this user')) {
        const output = await fetchJSON('/api/users', {id}, {method: 'DELETE'});
        if(output.status === 'ok') {
            await loadUsers();
        } else {
            alert(output.errorMessage);
        }   
    }
}

async function addPlaylist(userId) {
    const title = getValueById(`add_playlist_title_text_${userId}`);
    const songs = getValueById(`add_playlist_song_text_${userId}`);
    const output = await fetchJSON(`/api/playlists/${userId}`, {title, songs});

    if(output.status === 'ok') {
        getById(`playlist_div_${userId}`).innerHTML = output.playlists.map(playlistTemplate).join('<hr />');
    } else {
        alert(output.errorMessage);
    }   
}