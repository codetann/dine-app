import express from "express";
import path from "path";
import http from "http";
import cors from "cors";
import chalk from "chalk";
import socket from "socket.io";
import cookieParser from "cookie-parser";

import indexRouter from "./routes/index.router";
import authRouter from "./routes/auth.router";
import apiRouter from "./routes/api.router";

import socketio from "./sockets";
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
const io = socket(server, {
  cors: {
    origins: ["http://localhost:8050"],
  },
});
socketio(io);

// routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/api", apiRouter);

// server
server.listen(port, () =>
  console.log(
    `${chalk.blue("🚀 server")} - ${chalk.green("running")} on port ${port}`
  )
);
