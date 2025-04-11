import express from 'express';
import publicRoutes from './routes/public.routes.js';
import privateRoutes from './routes/private.routes.js';

import LogMiddleware from './middleware/log.middleware.js';


import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';


const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

if(!fs.existsSync(path.join(__dirname,"logs"))){
    fs.mkdirSync(path.join(__dirname,"logs"));
}



const app=express();

// *In built middleware
app.use(express.json());

// !Global Middleware
app.use(LogMiddleware);


// ?Routes Middleware
app.use("/public",publicRoutes);
app.use("/private",privateRoutes);





app.listen(8000,()=>{
    console.log("Server is running on port 8000");
})
