

import { Router } from "express";
import { registerUser, verifyEmail, loginUser,getUserProfile,authUser } from "../controllers/main.controller.js";

import { registerValidation,loginValidation } from "../controllers/validation/authValidation.js";

const router = Router();

//////register,verification & login
router.post('/register', registerValidation,registerUser);

router.post('/login',loginValidation ,loginUser);

router.post('/verifyEmail', verifyEmail);


///////for logedin_user
router.get('/profile',authUser,getUserProfile);

export default router;

