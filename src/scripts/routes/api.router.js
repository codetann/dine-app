import express from "express";
import { updateUserInfo } from "../controllers/api.controller";

const router = express.Router();

router.post("/update/user", updateUserInfo);

export default router;
