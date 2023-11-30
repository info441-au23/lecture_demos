import express from "express";
import jsonRouter from "./api/json_router.js";
import protobufsRouter from "./api/protobufs_router.js";

const router = express.Router();

router.use("/json", jsonRouter);
router.use("/protobufs", protobufsRouter);

export default router;
