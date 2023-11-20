import { Schema, model } from "mongoose";

const schema = new Schema({
  name: String,
  city: String,
});

const Spy = model("Spy", schema);

export default Spy;
