import express from "express";
import Item from "../../models/item.js";
import { calculateCompleted } from "../../lib/util.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const items = await Item.find();
  const percentCompleted = calculateCompleted(items);
  res.render("items/items", { items, percentCompleted });
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const item = new Item({ name });
  await item.save();
  const items = await Item.find();
  res.json({ success: true, items });
});

router.post("/toggle", async (req, res) => {
  const { id } = req.body;
  const item = await Item.findById(id);
  item.completed = !item.completed;
  await item.save();
  res.json({ success: true });
});

export default router;
