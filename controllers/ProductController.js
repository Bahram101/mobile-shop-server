import ProductModel from "../models/ProductModel.js";
import CategoryModel from "../models/CategoryModel.js";
import mongoose from "mongoose";

class ProductController {
  async create(req, res, next) {
    try {
      const product = await ProductModel.create({
        ...req.body,
        author: req.userId,
      });
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const allProducts = await ProductModel.find() 
        .populate("categoryId")
        .exec();
      const products = allProducts.map((item) => ({
        ...item._doc,
        id: item._id,
      }));
      console.log("prods", products);
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  async getProductsByCategory(req, res, next) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res
          .status(400)
          .json("Некорректный формат идентификатора категории");
      }

      const products = await ProductModel.find({ categoryId: req.params.id })
        .populate("categoryId")
        .exec();
      return res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  async getOne(req, res, next) {
    try {
      const id = req.params.id;
      const doc = await ProductModel.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true }
      ).populate("author");

      if (!doc) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json(doc);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const product = await ProductModel.findByIdAndDelete(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { body, params } = req;
      const product = await ProductModel.findByIdAndUpdate(params.id, body, {
        new: true,
      });
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
}

export default new ProductController();
