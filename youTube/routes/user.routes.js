import { Router } from "express";
import { signup,login,updateProfile,subscribe,unsubscribe } from "../controllers/user.controllers.js";
import { checkAuth } from "../middleware/auth.middleware.js";


const router=Router();



router.post("/signup",signup);

router.post('/login',login);


router.put('/update/:id',checkAuth,updateProfile);



router.post("/subscribed",checkAuth,subscribe);

router.post("/unSubscribed",checkAuth,unsubscribe);


export default router;




