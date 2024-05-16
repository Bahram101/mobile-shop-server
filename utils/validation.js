import { body } from "express-validator";

export const registerValidation = [
    body('email', 'Неверный формат почты!', isEmail())
]
