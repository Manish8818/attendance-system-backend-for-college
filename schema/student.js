const mongoose= require('mongoose');
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");


const studentSchema= new mongoose.Schema({

name:{
    type:String,
    required:[true,"please enter the name"]
},
clas:{
    type:String,
    required:[true,"plese enter your class name"]
},
rollno:{type:String,
    required:[true,"please enter your rollno"]

},

    father:{
        type:String,
        required:[true ,"please enter your father name"],
    },
    mother:{
        type:String,
        required:[true,"plese enter your mother name"]
    },

age:{
    type:Number,
    required:[true,"plese enter your age"]
},
school:{
    type:String,
    default:"rps mahendergarh"
},
email:{
    type:String,
    required:[true,"plese enter your email"],
    unique:true
},
phone:{
    type:Number,
    required:true
},
password:{
    type:String,
    required:[true,"plese enter the password"]
}

})

studentSchema.methods.generateAuthtoken= async function(){
    try{
        const token = jwt.sign({_id:this._id},process.env.KEY)
        console.log(token)
        return token

    }catch(err){
        console.log(err)
    }
}
//password hashing//
 
studentSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10);
        console.log(this.password)
    }
    next();
})


// const Student = mongoose.model("Student",studentSchema);


const student =  new mongoose.model("student",studentSchema)
module.exports= student;