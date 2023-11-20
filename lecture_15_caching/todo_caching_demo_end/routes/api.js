import express from "express";
import itemsRouter from "./api/items.js";

const router = express.Router();
router.use("/items", itemsRouter);

export default router;
