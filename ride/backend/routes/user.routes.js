

import { Router } from "express";
import { registerUser, verifyEmail, loginUser } from "../controllers/main.controller.js";

import { registerValidation,loginValidation } from "../controllers/validation/authValidation.js";

const router = Router();

router.post('/register', registerValidation,registerUser);

router.post('/login',loginValidation ,loginUser);

router.post('/verifyEmail', verifyEmail);

export default router;

