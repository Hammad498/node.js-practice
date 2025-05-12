import { Router } from "express";
import {checkAuth} from '../middleware/auth.middleware.js'
import {comment,deleteComment,editComment,getAllComments} from '../controllers/comments.controllers.js'

const router=Router();

router.post('/new',checkAuth,comment);
router.delete('/delete/:id',checkAuth,deleteComment)
router.put('/:commentId',checkAuth,editComment)
router.get('/comment/:videoId',checkAuth,getAllComments)


export default router;