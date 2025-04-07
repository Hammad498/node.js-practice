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

///////////////////////////
/////
///path.join,path.resolve,path.parse,path.extname,path.basename,path.dirname
///////
////events--> EventEmitter ...for this make a consgructor function,  ..... on & emit methods
//on(eventname,Listener)....create
//emit(eventname,[args])....execuute

// const emitter=require('events');
// const eventEmitter=new emitter();

// const path=require('path');


// eventEmitter.on('e1', (args) => {
//     console.log(`Event 1 triggered : ${args.username}`);
// });

// eventEmitter.emit('e1',{
//     username:"john",
//     id:1
// });

// //////////////////////
// const eventcounts={
//     LOGIN:0,
//     LOGOUT:0,
//     PURCHASE:0,
//     UPDATEPROFILE:0
// }

// const logfile='log.json';    

// if(fs.existsSync(logfile)){
//     const data=fs.readFileSync(logfile,'utf-8');
//    Object.assign(eventcounts,JSON.parse(data));
// }


// function savecounts(){
//     fs.writeFileSync(logfile,JSON.stringify(eventcounts,null,2))
// }

// eventEmitter.on('LOGIN',(username)=>{
//     console.log("User logged in successfully",username);
//     eventcounts.LOGIN++;
//     console.log(eventcounts);
//     savecounts();
    
// })

// eventEmitter.on('LOGOUT',(username)=>{
//     console.log("User logged out successfully",username);
//     eventcounts.LOGOUT++;
//     console.log(eventcounts);
//     savecounts();

// })

// eventEmitter.on('PURCHASE',(username,id)=>{
//     console.log("User pharsed successfully",username,id);
//     eventcounts.PURCHASE++;
//     console.log(eventcounts);
//     savecounts();
// })

// eventEmitter.on('UPDATEPROFILE',(username,field)=>{
//     console.log("User update profile successfully",username,field);
//     eventcounts.UPDATEPROFILE++;
//     console.log(eventcounts);
//     savecounts();
// })

// eventEmitter.on('summary',()=>{
//     console.log("\n event summary:");
//     console.log(eventcounts.LOGIN,"login events");
//     console.log(eventcounts.LOGOUT,"logout events");    
//     console.log(eventcounts.PURCHASE,"purchase events");
//     console.log(eventcounts.UPDATEPROFILE,"update profile events");
//     console.log("total events",eventcounts.LOGIN+eventcounts.LOGOUT+eventcounts.PURCHASE+eventcounts.UPDATEPROFILE);
// })

// eventEmitter.emit('LOGIN',"john");
// eventEmitter.emit('LOGOUT',"john");
// eventEmitter.emit('PURCHASE',"john",1);
// eventEmitter.emit('UPDATEPROFILE',"john","email");
// eventEmitter.emit('summary');



////////////////////////////////////////////////////////////////////////

