import { Router } from "express";
import checkAuth from '../utils/checkAuth.js'
import CategoryController from "../controllers/CategoryController.js";

const router = new Router()

router.post('/create', checkAuth, CategoryController.create)

export default router