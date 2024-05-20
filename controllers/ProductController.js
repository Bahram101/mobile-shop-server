import ProductModel from "../models/ProductModel.js";

class ProductController {
  async create(req, res) {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
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
      const allProducts = await ProductModel.find();
      console.log('allProducts',allProducts)
      res.status(200).json(allProducts);
    } catch (e) {
      console.log('eeee',e)
    }
  }
}

export default new ProductController();
