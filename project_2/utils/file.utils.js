
//file handlers
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ___filename=fileURLToPath(import.meta.url);
const ___dirname=path.dirname(___filename);


//in current directory create data folder with file tasks.json
const filePath=path.join(___dirname,"data","tasks.json")

export const readTask=()=>{
    try {
        ensureFileExists();
        const data=fs.readFileSync(filePath,'utf-8');
        return JSON.parse(data || '[]');
        
    } catch (error) {
        console.error('Error reading tasks:',error);
        return [];
        
    }
}


///write
export const writeTask=(tasks)=>{
    try {
        fs.writeFileSync(filePath,JSON.stringify(tasks,null,2),'utf-8');
        
    } catch (error) {
        console.error('error in writting tasks:',error)
        
    }

}



///ensure weather exists or not 
const ensureFileExists=()=>{
    try {
        if(!fs.existsSync(filePath)){
            fs.mkdirSync(path.dirname(filePath),{recursive:true});
            fs.writeFileSync(filePath,"[]","utf-8");

        }
        
    } catch (error) {
        console.error('Error ensuring file:',error)
        
    }
}