import express from "express";
import AUTH from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", AUTH.POST.login);
router.post("/signup", AUTH.POST.signup);

export default router;
