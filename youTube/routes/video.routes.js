import { Router } from "express";
import { upload,updateVideoMetadata,deleteVideo,getAllVideos,getOwnVideo } from "../controllers/video.controllers.js";
import { checkAuth } from "../middleware/auth.middleware.js";


const router=Router();


router.post('/upload',checkAuth,upload);


///no video change...just metadat change
router.put('/update/:id',checkAuth,updateVideoMetadata);


router.delete('/delete/:id',checkAuth,deleteVideo);


router.get('/getAll',checkAuth,getAllVideos);


router.get('/own_video',checkAuth,getOwnVideo);



export default router;