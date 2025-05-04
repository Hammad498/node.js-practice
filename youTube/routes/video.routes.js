import { Router } from "express";
import { upload,updateVideoMetadata,deleteVideo,getAllVideos,getOwnVideo,getById,get,getByCategory,getByTags,likes } from "../controllers/video.controllers.js";
import { checkAuth } from "../middleware/auth.middleware.js";


const router=Router();


router.post('/upload',checkAuth,upload);


///no video change...just metadat change
router.put('/update/:id',checkAuth,updateVideoMetadata);


router.delete('/delete/:id',checkAuth,deleteVideo);

//////////////////////////////////////////get requests/////////////////////////////////////////////////////
router.get('/getAll',checkAuth,getAllVideos);


router.get('/own_video',checkAuth,getOwnVideo);

router.get('/get/:id',checkAuth,getById);


//viewed by user feature
router.get('/:id',checkAuth,get);



router.get('/category/:category',checkAuth,getByCategory);

router.get("/tags/:tags",checkAuth,getByTags);

///////////////////////////////////////////////////////////////////////////////////////////////

router.post("/likes",checkAuth,likes);




export default router;