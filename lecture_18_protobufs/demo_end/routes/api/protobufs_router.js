import express from "express";
import spies from "../../lib/data.js";
import protobufs from "protobufjs";

const router = express.Router();

router.get("/", async (req, res) => {
  const root = await protobufs.load("./public/spies.proto");
  const SpyMessage = root.lookupType("lecture18.SpyMessage");

  const payload = { status: "ok", spies };
  const errMsg = SpyMessage.verify(payload);
  if (errMsg) throw Error(errMsg);

  const message = SpyMessage.create(payload);
  const bytes = SpyMessage.encode(message).finish();
  res.send(bytes);
});

export default router;
