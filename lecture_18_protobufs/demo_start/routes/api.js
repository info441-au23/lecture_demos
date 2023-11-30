import express from "express";
import jsonRouter from "./api/json_router.js";

const router = express.Router();

router.use("/json", jsonRouter);

export default router;
