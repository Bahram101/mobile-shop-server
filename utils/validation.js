import { body, validationResult } from "express-validator";

export const registerValidation = [
  body("fullName", "Укажите имя").isLength({ min: 3 }),
  body("email", "Неверный формат почты!").isEmail(),
  body("password", "Пароль должен быть мин 5 символов").isLength({ min: 5 }),
  body("avatarUrl").optional(),
];

export const loginValidation = [
  // body('email', 'Неверный формат почты').isEmail(),
  body("fullName", "Имя должен быть мин 3 символов").isLength({min: 3}),
  body("password", "Пароль должен быть мин 5 символов").isLength({ min: 5 }),
];

export const productCreateValidation = [
  body("title", "Введите заголовок товара").isLength({ min: 3 }).isString(),
  // body("categoryId", "Выберите категорию").custom(isObjectId).withMessage("Категория не должен быть пустым"),
  body("categoryId", "Выберите категорию")
  .notEmpty().withMessage("Категория не должна быть пустой")
];

export const categoryValidation = [
  body("name", "Введите название категория").isLength({ min: 3 }).isString(),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  next();
};
