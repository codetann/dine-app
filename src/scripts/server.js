import express from "express";
import path from "path";
import http from "http";
import cors from "cors";
import chalk from "chalk";
import cookieParser from "cookie-parser";

import indexRouter from "./routes/index.router";
import authRouter from "./routes/auth.router";

import io from "./sockets";
import db from "./database";
import config from "./environment";

const app = express();
const server = http.createServer(app);
const port = config.PORT;

// database
db.start();

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../dist")));

// socket.io
io.start();

// routes
app.use("/", indexRouter);
app.use("/auth", authRouter);

// server
server.listen(port, () =>
  console.log(
    `${chalk.blue("🚀 server")} - ${chalk.green("running")} on port ${port}`
  )
);
