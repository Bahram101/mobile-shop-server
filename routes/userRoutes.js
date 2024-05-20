import { Router } from "express";
import { register, login, getMe } from "../controllers/UserController.js";
import {
  registerValidation,
  loginValidation,
  handleValidationErrors,
} from "../utils/validation.js";
import checkAuth from "../utils/checkAuth.js";

const router = new Router();

router.post("/register", registerValidation, handleValidationErrors, register);
router.post("/login", loginValidation, handleValidationErrors, login);
router.get("/getMe", checkAuth, getMe);

export default router;
