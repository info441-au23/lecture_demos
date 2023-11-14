import { Schema, model } from "mongoose";

const schema = new Schema({
  completed: Boolean,
  name: String,
});

const Item = model("Item", schema);

export const resetItems = async () => {
  throw new Error("Not implemented");
};

export default Item;
