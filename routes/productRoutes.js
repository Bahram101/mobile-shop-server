import { Router } from "express";
import checkAuth from "../utils/checkAuth.js";
import productController from "../controllers/ProductController.js";

const router = new Router();
router.post("/create", checkAuth, productController.create);
router.get("/getAll", productController.getAll);

export default router;
