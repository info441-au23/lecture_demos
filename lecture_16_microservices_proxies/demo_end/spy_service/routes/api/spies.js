import express from "express";
import Spy from "../../models/spy.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const spies = await Spy.find();
  res.json({status: 'ok', spies})
});

export default router;
