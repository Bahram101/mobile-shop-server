import { Router } from "express";
import checkAuth from '../utils/checkAuth.js'
import CategoryController from "../controllers/CategoryController.js";

const router = new Router()

router.post('/create', checkAuth, CategoryController.create)
router.get('/get-all', CategoryController.getAll)
router.get('/get-one/:id', CategoryController.getOne)
router.put('/update/:id', CategoryController.getOne)

export default router