const mongoose= require("mongoose");

const presentSchema= new  mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    rollno:{
        type:number,
        required:true
    },
    password:{
        type:String,
        required:[true,"please enter the password"]
    }
})
const present= mongoose.models("present",presentSchema);
models.exports= present