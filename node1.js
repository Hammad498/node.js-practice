const fs=require('fs');
const {fs11}=require('./node2.js');
console.log(fs11(2,2));


fs.writeFileSync("node1.txt","hello",(err)=>{
    if(err) throw err;
    console.log("File created successfully");
})


fs.readFileSync("node1.txt","utf-8",(err,data)=>{
    if(data){
        console.log(data);
    }
    else{
        console.log(err);
    }
})

fs.appendFileSync("node1.txt", new Date().toString(), (err) => {
    if (err) throw err;
    console.log("Data appended successfully");    
})

/////////////////////////////////
///////////////////



