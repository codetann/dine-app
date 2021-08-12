import express from "express";
import {
  updateUserInfo,
  nearbyBusinesses,
  addFavorite,
  getFavorites,
} from "../controllers/api.controller";

const router = express.Router();

router.post("/update/user", updateUserInfo);
router.post("/update/favorite", addFavorite);
router.post("/favorites", getFavorites);
router.post("/nearby", nearbyBusinesses);

export default router;
