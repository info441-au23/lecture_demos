import mongoose from "mongoose";

export async function connect() {
  const {NODE_ENV: env, REGION: region} = process.env;
  const uri = `mongodb+srv://tparikh:${process.env.MONGO_PW}@cluster0.rqdcxwz.mongodb.net/Lecture16Demo-${env}-${region}`;
  await mongoose.connect(uri);
}
