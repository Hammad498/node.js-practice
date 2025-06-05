

import { Router } from "express";
import { registerUser, VerfiyEmail, loginUser,getUserProfile } from "../../backend/controllers/auth/auth.controller.js";

import { registerValidation,loginValidation } from "../../backend/validation/authValidation.js";
import { authUser } from "../middleware/auth.Middleware.js";

const router = Router();

//////register,verification & login
router.post('/register', registerValidation,registerUser);

router.post('/login',loginValidation ,loginUser);

router.post('/verifyEmail', VerfiyEmail);


///////for logedin_user
router.get('/profile',authUser,getUserProfile);

export default router;

