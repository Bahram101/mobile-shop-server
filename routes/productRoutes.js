import { Router } from "express";
import checkAuth from "../utils/checkAuth.js";
import productController from "../controllers/ProductController.js";
import {
  handleValidationErrors,
  productCreateValidation,
} from "../utils/validation.js";

const router = new Router();
router.post(
  "/create",
  checkAuth,
  productCreateValidation,
  handleValidationErrors,
  productController.create
);
router.put(
  "/:id",
  checkAuth,
  productCreateValidation,
  handleValidationErrors,
  productController.update
);
router.post(
  "/availability",
  checkAuth,
  productController.updateProductAvailability
);
router.get("/", productController.getAll);
router.get("/:id", productController.getOne);
router.get("/byCategory/:id", productController.getProductsByCategory);
router.get("/search/:query", productController.searchProduct);
router.delete("/:id", checkAuth, productController.delete);

export default router;
