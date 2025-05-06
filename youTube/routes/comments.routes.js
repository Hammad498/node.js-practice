import { Router } from "express";
import {checkAuth} from '../middleware/auth.middleware.js'
import {comment} from '../controllers/comments.controllers.js'

const router=Router();

router.post('/new',checkAuth,comment);


export default router;