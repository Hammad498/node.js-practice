


const getUsers=(req,res)=>{
    res.send('user get')
}

const createUsers=(req,res)=>{
    res.send('user send')
}


const updateUsers=(req,res)=>{
    res.send('user update')
}

const deleteUsers=(req,res)=>{
    res.send('user delete')
}


export default {getUsers,createUsers,updateUsers,deleteUsers};