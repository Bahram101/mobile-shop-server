import { Router } from "express";
import { getMe, login, register } from "../controllers/auth.js";

const router = new Router();

router.post("/register", register);
router.get("/login", login);
router.get("/me", getMe);

export default router;
