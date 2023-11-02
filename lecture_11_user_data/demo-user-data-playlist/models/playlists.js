import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
    title: String,
    songs: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

const Playlist = mongoose.model('Playlist', playlistSchema);

export default Playlist;