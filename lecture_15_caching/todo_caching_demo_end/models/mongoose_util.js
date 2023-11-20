import mongoose from "mongoose";

export async function connect() {
  const uri = `mongodb+srv://tparikh:${process.env.MONGO_PW}@cluster0.rqdcxwz.mongodb.net/Lecture14Demo-${process.env.NODE_ENV}`;
  await mongoose.connect(uri);
}
