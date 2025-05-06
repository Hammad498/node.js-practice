import { Router } from "express";
import checkAuth from '../middleware/auth.middleware.js'

const router=Router();

router.post('/comment',checkAuth,comment);


export default router;