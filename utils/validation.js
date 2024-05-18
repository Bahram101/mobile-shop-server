import { body, validationResult } from "express-validator";

export const registerValidation = [
  body("fullName", "Укаите имя").isLength({ min: 3 }),
  body("email", "Неверный формат почты!").isEmail(),
  body("password", "Пароль должен быть мин 5 символов").isLength({ min: 5 }),
  body('avatarUrl').optional()
];

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть мин 5 символов').isLength({min: 5})
]

export const handleValidationErrors = (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }
    next()
}