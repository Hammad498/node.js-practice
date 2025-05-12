import { Router } from "express";
import {checkAuth} from '../middleware/auth.middleware.js'
import {comment,deleteComment,editComment} from '../controllers/comments.controllers.js'

const router=Router();

router.post('/new',checkAuth,comment);
router.delete('/delete/:id',checkAuth,deleteComment)
router.put('/:commentId',checkAuth,editComment)


export default router;