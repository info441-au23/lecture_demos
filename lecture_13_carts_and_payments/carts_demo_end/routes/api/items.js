import express from "express";
import Item from "../../models/item.js";

const router = express.Router();

router.get("/getCart", async (req, res) => {
  const cart = req.session.cart;
  const promises = Object.entries(cart).map(async ([itemId, { quantity }]) => {
    const item = await Item.findById(itemId);
    return {
      name: item.name,
      quantity,
      total: item.cost * quantity,
    };
  });
  const data = await Promise.all(promises);
  res.json(data);
});

router.post("/addToCart", (req, res) => {
  const itemId = req.body.itemId;
  const cart = req.session.cart;
  console.debug(`0: Adding itemId ${itemId} to cart:`, cart);
  if (!cart[itemId]) {
    cart[itemId] = { quantity: 0 };
  }
  cart[itemId].quantity++;

  console.debug(`1: Adding itemId ${itemId} to cart:`, cart);
  res.json({ status: "ok" });
});

export default router;
