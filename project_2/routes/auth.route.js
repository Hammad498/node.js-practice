import express from "express";
import { Router } from "express";

const router=Router();


router.post('/login',(req,res)=>{
    res.status(200).send(`Welcome to login route.`)
})

router.get('/logout',(req,res)=>{
    res.status(200).send(`Welcome to logout route.`)
})

export default router;