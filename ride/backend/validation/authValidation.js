// import { body } from "express-validator";

// export const  registerValidation = [
//   body('email').isEmail().withMessage('Invalid email!'),
//   body('fullname.firstname').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
//   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
// ];

// export const loginValidation = [
//   body('email').isEmail().withMessage('Invalid email!'),
//   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
// ];

// authValidation.js
import { body } from "express-validator";

export const registerValidation = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("fullname.firstname")
    .trim()
    .notEmpty().withMessage("First name is required")
    .isLength({ min: 3 }).withMessage("First name must be at least 3 characters"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

////////////////////////////////

export const loginValidation = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

