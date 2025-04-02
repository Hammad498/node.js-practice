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



const http=require('http');


const server=http.createServer((req,res)=>{
    res.writeHead(200,{
        "content-type":"text/html"
    }),
    res.end("<h1>Hello world</h1>");

    const log=`${Date.now()}:new request received `
    fs.appendFileSync("log.txt", log, (err) => {
        if (err) throw err;
        console.log("Data appended successfully");    
    })

})

server.listen(3000,()=>{
    console.log("Server is running on port 3000");
})

/////////////////////////

setTimeout(()=>{
    console.log("hello world")
},2000)


let count=0;

const cc=setInterval(()=>{
    console.log(`${count}:the count is ${count}`);
    if(count===5){
        clearInterval(cc);
    }
    count++;
},1000)