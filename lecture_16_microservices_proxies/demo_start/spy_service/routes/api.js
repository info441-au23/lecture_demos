import express from "express";
import spiesRouter from "./api/spies.js";

const router = express.Router();
router.use("/spies", spiesRouter);

export default router;
