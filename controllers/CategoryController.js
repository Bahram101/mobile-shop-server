import CategoryModel from "../models/CategoryModel.js";

class CategoryController {
  async create(req, res) {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const category = await CategoryModel.create(req.body);
    console.log('catcat',category)
    res.status(201).json(category);
  }
}

export default new CategoryController();
