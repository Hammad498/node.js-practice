import { Router } from "express";
import { signup,login,updateProfile } from "../controllers/user.controllers.js";


const router=Router();



router.post("/signup",signup);

router.post('/login',login);


router.put('/update',updateProfile);




export default router;




