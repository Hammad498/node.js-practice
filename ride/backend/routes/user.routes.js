

import { Router } from "express";
import { registerUser, verifyEmail, loginUser } from "../controllers/main.controller.js";
import { body } from "express-validator";

const router = Router();

router.post('/register', [
  body('email').isEmail().withMessage('Invalid email!'),
  body('fullname.firstname').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  registerUser
]);

router.post('/login', [
  body('email').isEmail().withMessage('Invalid email!'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  loginUser
]);

router.post('/verifyEmail', verifyEmail);

export default router;

