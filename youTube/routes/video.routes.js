import { Router } from "express";
import { upload,updateVideoMetadata,deleteVideo } from "../controllers/video.controllers.js";
import { checkAuth } from "../middleware/auth.middleware.js";


const router=Router();


router.post('/upload',checkAuth,upload);


///no video change...just metadat change
router.put('/update/:id',checkAuth,updateVideoMetadata);


router.delete('/delete/:id',checkAuth,deleteVideo);



export default router;