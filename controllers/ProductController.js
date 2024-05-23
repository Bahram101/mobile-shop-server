import ProductModel from "../models/ProductModel.js";

class ProductController {
  async create(req, res) {
    try {
      const product = await ProductModel.create({
        ...req.body,
        author: req.userId,
      });
      res.status(201).json(product);
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getAll(req, res) {
    try {
      const allProducts = await ProductModel.find().populate("author").exec();
      res.status(200).json(allProducts);
    } catch (e) {
      console.log("eeee", e);
    }
  }

  async getOne(req, res) {
    try {
      // const product = await ProductModel.findById(req.params.id)
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
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async delete(req, res) {
    try {
      const product = await ProductModel.findByIdAndDelete(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async update(req, res) {
    try {
      const { body, params } = req;
      const product = await ProductModel.findByIdAndUpdate(params.id, body, {
        new: true,
      });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new ProductController();
