const usersTemplate = (userInfo) => 
        `<div>
            <h3>
                Username: ${userInfo.username}
                <button onclick="deleteUser('${userInfo._id}')">Delete</button>
            </h3>
            <strong>Favorite Bands:</strong> ${userInfo.favorite_bands.join(", ")} <br>
            <strong>Add Band:</strong> <input type="text" id="add_band_text_${userInfo._id}" />
            <button onclick="addBand('${userInfo._id}')">Add Band</button>

            <h3>Playlists</h3>
            <div id="playlist_div_${userInfo._id}">Loading playlists...</div>

            <h3>Add Playlist</h3>
            <strong>Title:</strong> <input type="text" id="add_playlist_title_text_${userInfo._id}" /> <br>
            <strong>Songs:</strong> <input type="text" id="add_playlist_song_text_${userInfo._id}" /> <br>
            <button onclick="addPlaylist('${userInfo._id}')">Add Playlist</button>
        </div>
        `
;

const playlistTemplte = (playlist) => `
        <div>
            <h4>Playlist: ${playalistInfo.title}</h4>
            <strong>Songs:</strong> ${playalistInfo.songs}
        </div>
`;

async function addUser(){
}

async function loadUsers(){
}

async function loadPlaylistsForUser(userId){
}

async function addPlaylist(id){
}

async function addBand(id){
}

async function deleteUser(id){
}
