import { Router } from "express";
import { register, login, getMe } from "../controllers/UserController.js";
import {
  registerValidation,
  handleValidationErrors,
} from "../utils/validation.js";

const router = new Router();

router.post("/register", registerValidation, handleValidationErrors, register);
router.get("/login", login);
router.get("/me", getMe);

export default router;
