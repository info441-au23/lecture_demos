import express from "express";
import data from "../../lib/data.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ status: "ok", data });
});

export default router;
