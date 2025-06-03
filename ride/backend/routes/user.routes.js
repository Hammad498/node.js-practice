import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import validator from 'express-validator';

const { body } = validator;

const router = Router();

router.post('/register', [
    body('email').isEmail().withMessage('Invalid!'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Name must be 3 character long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 character long'),
    registerUser
]);

export default router;
