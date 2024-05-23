import { Router } from "express";
import checkAuth from "../utils/checkAuth.js";
import productController from "../controllers/ProductController.js";
import { handleValidationErrors, productCreateValidation } from "../utils/validation.js";

const router = new Router();
router.post("/create", checkAuth, productController.create);
router.get("/", productController.getAll);
router.get("/:id", productController.getOne);
router.delete("/:id", productController.delete);
router.put("/:id", checkAuth, productCreateValidation, handleValidationErrors, productController.update);

export default router;
