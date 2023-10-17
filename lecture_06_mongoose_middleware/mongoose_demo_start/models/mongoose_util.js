import mongoose from 'mongoose';

export async function connect() {
    await mongoose.connect(`mongodb+srv://tparikh:${process.env.MONGO_PW}@cluster0.rqdcxwz.mongodb.net/Lecture06DemoDB`);
};