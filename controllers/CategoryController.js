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

      function buildCategoryTree(categories) {
        const categoryMap = {};
        const topLevelCategories = [];
        const parsedCats = JSON.parse(JSON.stringify(categories))
        
        parsedCats.forEach((category) => {
          category.children = [];
          categoryMap[category._id] = category;
        });

        console.log('parsedCats', parsedCats);
        console.log('categoryMap', categoryMap);
      
        // Добавляем подкатегории к родительским категориям
        parsedCats.forEach((category) => {
          if (category.parent !== null) {
            const parentCategory = categoryMap[category.parent];
            if (parentCategory) {
              parentCategory.children.push(category);
            }
          } else {
            topLevelCategories.push(category);
          }
        });
      
        return topLevelCategories;
      }
      
      // Получение структурированного списка категорий
      const structuredCategories = buildCategoryTree(allCategories);
 
      res.status(200).json(structuredCategories);
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
