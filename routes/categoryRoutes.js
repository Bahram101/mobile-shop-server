import { Router } from "express";
import checkAuth from "../utils/checkAuth.js";
import CategoryController from "../controllers/CategoryController.js";
import {
  categoryValidation,
  handleValidationErrors,
} from "../utils/validation.js";

const router = new Router();

router.post(
  "/create",
  checkAuth,
  categoryValidation,
  handleValidationErrors,
  CategoryController.create
);
router.get("/get-all", CategoryController.getAll);
router.get("/get-one/:id", CategoryController.getOne);
router.put(
  "/update/:id",
  checkAuth,
  categoryValidation,
  handleValidationErrors,
  CategoryController.update
);
router.delete("/delete/:id", checkAuth, CategoryController.delete);

export default router;
