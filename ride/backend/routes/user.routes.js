

import { Router } from "express";
import { registerUser, VerfiyEmail, loginUser,getUserProfile } from "../../backend/controllers/auth/auth.controller.js";
import { registerValidation,loginValidation } from "../validation/authValidation.js";
import { authUser } from "../middleware/auth.Middleware.js";
import { handleValidationResult } from "../validation/validationResult.js";

const router = Router();

//////register,verification & login
router.post('/register', registerValidation,handleValidationResult,registerUser);

router.post('/login',loginValidation, handleValidationResult,loginUser);

router.post('/verifyEmail', VerfiyEmail);


///////for logedin_user
router.get('/profile',authUser,getUserProfile);

export default router;

