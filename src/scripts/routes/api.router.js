import express from "express";
import auth from "../middleware/auth";
import API from "../controllers/api.controller";

const router = express.Router();

router.post("/user", auth, API.GET.dashboard);

export default router;
