const mongoose= require("mongoose");

const connection=()=>{
    mongoose.connect(process.env.CONN)
    try{
        console.log("server is connected")
    }catch(err){
        console.log("error in the connection",err);
    }
}
module.exports= connection;