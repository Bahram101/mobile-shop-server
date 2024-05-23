import CategoryModel from "../models/CategoryModel.js";

class CategoryController {
  async create(req, res) {
    try {
      const category = await CategoryModel.create(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async getAll(req, res) {
    try {
      const allCategories = await CategoryModel.find();
      res.status(200).json(allCategories);
    } catch (error) {
      res.status(500).json({
        message: "An error occured while fetching categories",
        error,
      });
    }
  }

  async getOne(req, res) { 
    try {
      const category = await CategoryModel.findById(req.params.id); 
      res.status(200).json(category);
    } catch (error) {
        console.log('eeeeeeeeeee',error)
      res.status(500).json({
        message: "An error occured while fetching category",
        error,
      });
    }
  }
}

export default new CategoryController();
