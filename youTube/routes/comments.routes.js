import { Router } from "express";
import {checkAuth} from '../middleware/auth.middleware.js'
import {comment,deleteComment} from '../controllers/comments.controllers.js'

const router=Router();

router.post('/new',checkAuth,comment);
router.delete('/delete/:id',checkAuth,deleteComment)


export default router;