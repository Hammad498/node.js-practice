import { Router } from "express";
import { upload } from "../controllers/video.controllers.js";
import { checkAuth } from "../middleware/auth.middleware.js";


const router=Router();


router.post('/upload',checkAuth,upload);



export default router;