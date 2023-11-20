import express from "express";
import Item from "../../models/item.js";
import { calculateCompleted } from "../../lib/util.js";
import cache from "memory-cache";

const router = express.Router();

const CACHE_KEY = "todolist";

const getData = async () => {
  const data = cache.get(CACHE_KEY);

  if (data) {
    return data;
  }

  const sleep = new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 5000),
  );
  await sleep;

  const items = await Item.find();
  const percentCompleted = calculateCompleted(items);
  const computed = { items, percentCompleted };
  cache.put(CACHE_KEY, computed, 20000);
  return computed;
};

router.get("/", async (req, res) => {
  const data = await getData();
  res.render("items/items", data);
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
  cache.put(CACHE_KEY, null);
  res.json({ success: true });
});

export default router;
