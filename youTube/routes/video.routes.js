import { Router } from "express";
import { upload } from "../controllers/video.controllers.js";


const router=Router();


router.post('/upload',upload);



export default router;