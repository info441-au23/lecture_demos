import mongoose from "mongoose";

export async function connect() {
  console.log("ENV", process.env.MONGO_PW);
  const uri = `mongodb+srv://tparikh:${process.env.MONGO_PW}@cluster0.rqdcxwz.mongodb.net/Lecture13Store`;
  await mongoose.connect(uri);
}
