import { Router } from "express";
import { signup,login } from "../controllers/user.controllers.js";


const router=Router();



router.post("/signup",signup);

router.post('/login',login);




export default router;




//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODEzYTAyYjFmMjVkY2IxYWUxNTJkOWUiLCJjaGFubmVsTmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicGhvbmUiOiIwMzAwMDAwMDAwMDAiLCJsb2dvSWQiOiJicDhpZXF1Z215c2VoaHA3eGV0cSIsImlhdCI6MTc0NjE2OTU0NSwiZXhwIjoxNzQ3MDMzNTQ1fQ.XFrvWqReZWj5T7lFc4mv0MWmvOX8d6I3sJQwGoRVfqI