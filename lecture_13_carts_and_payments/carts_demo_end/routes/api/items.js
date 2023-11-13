import express from "express";
import Item from "../../models/item.js";
import stripeLib from "stripe";
const stripe = stripeLib("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const router = express.Router();

async function loadCart(cart) {
  const promises = Object.entries(cart).map(async ([itemId, { quantity }]) => {
    const item = await Item.findById(itemId);
    return {
      name: item.name,
      quantity,
      total: item.cost * quantity,
    };
  });
  return Promise.all(promises);
}

router.get("/getCart", async (req, res) => {
  const cart = req.session.cart;
  const data = await loadCart(cart);
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

router.post("/create-payment-intent", async (req, res) => {
  const cart = req.session.cart;
  const data = await loadCart(cart);

  const amount = data.reduce((acc, item) => {
    return acc + item.total;
  }, 0);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount),
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

export default router;
