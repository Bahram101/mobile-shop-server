import CategoryModel from "../models/CategoryModel.js";

class CategoryController {
  async create(req, res, next) {
    try {
      const category = await CategoryModel.create(req.body);
      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const allCategories = await CategoryModel.find();
      res.status(200).json(allCategories);
    } catch (err) {
      next(err);
    }
  }

  async getOne(req, res, next) {
    try {
      const category = await CategoryModel.findById(req.params.id);
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const category = await CategoryModel.findByIdAndDelete(req.params.id);
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { body, params } = req;
      const category = await CategoryModel.findByIdAndUpdate(params.id, body, {
        new: true,
      });
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }
}

export default new CategoryController();
