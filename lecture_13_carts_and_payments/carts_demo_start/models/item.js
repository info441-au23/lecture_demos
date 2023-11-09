import { Schema, model } from "mongoose";

const schema = new Schema({
  name: String,
  description: String,
  cost: Number,
});

const Item = model("Item", schema);

export const loadItemsIfNecessary = async () => {
  const existingItems = await Item.find();
  if (existingItems.length > 0) {
    return;
  }

  const items = [
    {
      name: "Jetpack",
      description: "Why jump off roofs when you can fly off them instead?",
      cost: 2499.99,
    },
    {
      name: "Underwater Car",
      description:
        "Hide from baddies underwater with this special underwater car.",
      cost: 25000,
    },
    {
      name: "Shoe tracker",
      description:
        "Keep an eye on your foes from a safe distance with this tracker built into a shoe",
      cost: 30,
    },
  ];

  const promises = items.map((item) => {
    const mongoObject = new Item(item);
    return mongoObject.save();
  });

  await Promise.all(promises);
};

export default Item;
