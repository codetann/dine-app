import express from "express";
import { uploadPhoto } from "../controllers/api.controller";

const router = express.Router();

router.post("/upload/photo", uploadPhoto);

export default router;
