const usersTemplate = (userInfo) =>
    `<div>
            <h3>
                Name: ${userInfo.name}
                <button onclick="deleteUser('${userInfo._id}')">Delete</button>
            </h3>
            <strong>Favorite Bands:</strong> ${userInfo.bands.join(", ")} <br>
            <label>Add Band:</label> <input type="text" id="add_band_text_${userInfo._id}" />
            <button onclick="addBand('${userInfo._id}')">Add Band</button>

            <h3>Playlists</h3>
            <div id="playlist_div_${userInfo._id}">Loading playlists...</div>

            <h3>Add Playlist</h3>
            <label>Title:</label> <input type="text" id="add_playlist_title_text_${userInfo._id}" /> <br>
            <label>Songs:</label> <input type="text" id="add_playlist_song_text_${userInfo._id}" /> <br>
            <button onclick="addPlaylist('${userInfo._id}')">Add Playlist</button>
        </div>
        `
    ;

const playlistTemplate = (playlist) => `
        <div>
            <h4>Playlist: ${playalistInfo.title}</h4>
            <strong>Songs:</strong> ${playalistInfo.songs}
        </div>
`;

function getById(id) {
    return document.getElementById(id);
}

function getValForId(id) {
    return getById(id).value;
}

async function jsonFetch(url, body, options = { method: 'POST' }) {
    const response = await fetch(url, {
        method: "POST",
        headers: { // required to get express to automatically parse the body
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    });
    return await response.json();
}

async function addUser() {
    const name = getValForId('name_input');
    const output = await jsonFetch('api/users', {name});

    if (output.status == 'ok') {
        getById('results').innerHTML = output.data;
    } else {
        getById('results').innerHTML = `
            <div style='color: red'>Error: ${output.message}</div>
        `;
    }
}

async function loadUsers() {
    const response = await fetch('api/users');
    const { users } = await response.json();
    getById('allusersdiv').innerHTML = users.map(usersTemplate).join('<hr />');
}

async function loadPlaylistsForUser(userId) {
}

async function addPlaylist(id) {
}

async function addBand(id) {
    const bandText = getValForId(`add_band_text_${id}`);
    const bands = bandText.split(/,\s+/);
    const output = await jsonFetch('/api/users/bands', {bands, id}); 
}

async function deleteUser(id) {
}
