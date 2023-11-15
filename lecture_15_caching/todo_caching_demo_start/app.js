import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import session from "express-session";
import "dotenv/config";

import { fileURLToPath } from "url";
import { dirname } from "path";
import { connect } from "./models/mongoose_util.js";
import Item from "./models/item.js";
import apiRouter from "./routes/api.js";
import { calculateCompleted } from "./lib/util.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
);

app.use(async (_req, _res, next) => {
  // custom middleware to create the mongo connection
  await connect();
  next();
});

app.get("/", async (req, res) => {
  const items = await Item.find();
  const percentCompleted = calculateCompleted(items);
  res.render("index", { items, percentCompleted });
});

app.use("/api", apiRouter);

export default app;
