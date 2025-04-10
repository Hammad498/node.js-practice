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



// const http=require('http');


// const server=http.createServer((req,res)=>{
//     res.writeHead(200,{
//         "content-type":"text/html"
//     }),
//     res.end("<h1>Hello world</h1>");

//     const log=`${Date.now()}:new request received `
//     fs.appendFileSync("log.txt", log, (err) => {
//         if (err) throw err;
//         console.log("Data appended successfully");    
//     })

// })

// server.listen(3000,()=>{
//     console.log("Server is running on port 3000");
// })

/////////////////////////

// setTimeout(()=>{
//     console.log("hello world")
// },2000)


// let count=0;

// const cc=setInterval(()=>{
//     console.log(`${count}:the count is ${count}`);
//     if(count===5){
//         clearInterval(cc);
//     }
//     count++;
// },1000)

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
///stream////


// const server=http.createServer((req,res)=>{
    // res.end("<h1>Hello world</h1>");


    // const file=fs.readFileSync("sample.txt")
    // res.end(file);


//download file in a good way
    // const readablestream=fs.createReadStream("sample.txt");
    // readablestream.pipe(res);
   


//copy paste
    //  const readstream=fs.createReadStream("sample.txt");
    //  const writestream=fs.createWriteStream("output.txt");


    //  readstream.on('data',(chunk)=>{
    //     console.log("new chunk received",chunk);
    //     writestream.write(chunk);
        
    //  })
// })



// server.listen(3000,()=>{
//     console.log("Server is running on port 3000");
// })


/////////////////custom streams///////////
// const {Readable,Writable,Transform}=require('stream');

// const readstreamm=fs.createReadStream("sample.txt");
// const writestream=fs.createWriteStream("output.txt");
// const transform=new Transform({
//     transform(chunk,encoding,callback){
//         const modeified=chunk.toString().toUpperCase();
//         callback(null,modeified);
//     }
// })

// readstreamm.pipe(transform).pipe(writestream);


// const readable=new Readable({
//     highWaterMark:2,
//     read() {
//     }
// })

// const writable=new Writable({
//     write(streamdata){
//         console.log("new data received",streamdata.toString());
        
//     }
// })

// readable.on("data",(chunk)=>{
//     console.log("new chunk received",chunk.toString());
//     writable.write(chunk);
// })

// readable.push("hello")


//////////////////////////////////////

////os.platform(),os.userinfo(),os.cpus(),os.arch(),os.freemem(),os.totalmem(),
// os.uptime(),os.hostname(),os.networkInterfaces(),os.tmpdir(),os.homedir(),os.type(),os.release()




//////////////////

const crypto=require('crypto');


const b=crypto.randomBytes(8).toString('hex');
console.log(b);

const hash=crypto.createHash('sha256').update('hello world').digest('hex');
const inputvalue="hello world";
const matchvalue=crypto.createHash('sha256').update(inputvalue).digest('hex')

if(hash===matchvalue){
    console.log("hash matched")
}
else{
    console.log("hash not matched")
}
console.log(hash);
////////////


const express=require('express');
const app=express();

app.use(express.json());

const userdata =require('./data/data.js');


app.get("/",(req,res)=>{
    res.send("<h1>Hello world</h1>");
})


app.get("/api/v1/users",(req,res)=>{
    res.status(200).send(userdata.data);
})

app.get("/api/v1/users", (req, res) => {
    const { username } = req.query;
    console.log("Query username:", username);
    if (username) {
        const user = userdata.data.filter((user) => user.username === username);
        console.log("Filtered result:", user);
        res.status(200).send(user);
    } else {
        res.status(400).send({ message: "Please provide a username" });
    }
});

///params
app.get("/api/v1/users/:id",(req,res)=>{
    const {id}=req.params;
    const user=userdata.data.find((user)=>user.id===parseInt(id));
    if(user){
        res.status(200).send(user);
    }
    else{
        res.status(404).send({message:"user not found"});
    }

})

/////
app.post('api/v1/users',(req,res)=>{
    console.log(req.body);

    res.status(201).send({message:"user created successfully"});
   
})

///////////////



app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})




// app.post("/api/v1/users", (req, res) => {
//     const user = req.body;

//     if (!user.username || !user.id || !user.email) {
//         return res.status(400).json({ error: "Missing required fields" });
//     }

//     try {
//         userdata.data.push(user);
//         console.log(user);
//         res.status(201).json({ 
//             message: "User created successfully!",
//             user: user 
//         });
//     } catch (error) {
//         res.status(500).json({ error: "Internal server error" });
//     }
// });



//////////////////

app.post('/api/v1/users', (req, res) => {
    const { username, email } = req.body;

    
    if (!username || !email) {
        return res.status(400).json({ error: "Username and email are required" });
    }

    const User = {
        id: userdata.length + 1, 
        username,
        email,
    };

    userdata.push(User);  

    res.status(201).send(User);  
});


// const { data: userdata } = require('./data/data.js');  

// // POST route
// app.post('/api/v1/users', (req, res) => {
//     const { username, email } = req.body;

//     if (!username || !email) {
//         return res.status(400).json({ error: "Username and email are required" });
//     }

//     const User = {
//         id: userdata.length + 1,  
//         username,
//         email,
//     };

//     userdata.push(User);  

//     res.status(201).send(User); 
// });

///put///////////////////////////////


// app.put("/api/v1/users/:id",(req,res)=>{
//     const {body,params:{id}}=req;

//     const parsedid=parseInt(id);

//     const userIndex=userdata.findIndex((user)=>user.id===parsedid);
//     if(userIndex===-1){
//         res.status(404).send('not found');
//     }

//     userdata[userIndex]={
//         id:parsedid,
//         ...body
//     }

//     res.status(201).send({
//         message:"User Updated",
//         data:userdata[userIndex]
//     })
    
// })


app.put('/api/v1/users/:id', (req, res) => {
    const { body, params: { id } } = req;

    const parsedId = parseInt(id);  // Use camelCase for consistency

    const userIndex = userdata.findIndex((user) => user.id === parsedId);
    if (userIndex === -1) {
        return res.status(404).send('Not found');
    }

    userdata[userIndex] = {
        id: parsedId,
        ...body  // Overwrite with new username and email
    };

    res.status(201).send({
        message: "User Updated",
        data: userdata[userIndex]
    });
});

///////////////////////

///middlewares   1.global   2.specific for routes 3.in-built ////////////////


function middleware(req,res,next){
    console.log("Middleware executed");
    next();
   
}

app.use(middleware);