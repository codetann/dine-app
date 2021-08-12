import express from "express";
import {
  updateUserInfo,
  nearbyBusinesses,
} from "../controllers/api.controller";

const router = express.Router();

router.post("/update/user", updateUserInfo);
router.post("/nearby", nearbyBusinesses);

export default router;
