import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


//handles ES module ___dirname & __filename
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);


///middleware to log all requests

const LogMiddleware=(req,res,next)=>{
    console.log("LogMiddleware called");
    const log=`[${new Date().toISOString()}]  ${req.method} ${req.url}\n`;
    const logFile=path.join(__dirname,"../logs/request.log");

    fs.appendFile(logFile,log,(err)=>{
        if(err){
            console.error(`Failed to log request:`,err)
        }
    })


    next();
};



export default LogMiddleware;