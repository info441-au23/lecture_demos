import mongoose from 'mongoose';

export async function connect() {
    const uri = `mongodb+srv://tparikh:${process.env.MONGO_PW}@cluster0.rqdcxwz.mongodb.net/Lecture12Playlist`;
    await mongoose.connect(uri);
};