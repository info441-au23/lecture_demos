import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import { fileURLToPath } from "url";
import { dirname } from "path";
import { createProxyMiddleware } from "http-proxy-middleware";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/eu",
  createProxyMiddleware({
    target: "http://localhost:3002",
    pathRewrite: { "^/\\w+/(.*)": "/$1" },
  }),
);
app.use(
  "/americas",
  createProxyMiddleware({
    target: "http://localhost:3001",
    pathRewrite: { "^/\\w+/(.*)": "/$1" },
  }),
);

export default app;
