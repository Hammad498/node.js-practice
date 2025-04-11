import {Router} from 'express';

const router=Router();

router.get("/getUsers",(req,res)=>{
    res.send("Get Users Route");
})


export default router;