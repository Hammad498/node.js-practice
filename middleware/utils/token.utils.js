import crypto from "crypto";

export const generateToken=()=>{
    return crypto.randomBytes(16).toString('hex');
}


//for validate

export const validateToken=(token)=>{
    return token.length===32;
}