import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
});

const User = mongoose.model('User', userSchema);

export default User;