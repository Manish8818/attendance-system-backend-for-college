const express= require('express');
const router= express.Router();
const Student= require("../schema/student")
const bcrypt= require("bcrypt");
const cookieParser= require("cookie-parser")
router.use(express.json())

const isAuthenicated = require('../middleware/auth');
router.use(cookieParser());

router.get("/home",async(req,res)=>{
    res.json({message:"welcome to the home page"});

})
router.post("/registration",async(req,res)=>{
   const{name, clas, rollno,father,mother,age,school,email,phone,password}=req.body
    if(!name||!clas||!rollno||!father||!mother||!age||!school||!email||!phone||!password){
         return res.json({message:"please enter all the details"});
    }
    try{
    const student=  await new Student(req.body)
    const studentsave= await student.save();
    console.log(studentsave)
    res.send({message:"registration is succesful"});
    }catch(err){ console.log(err)
        res.send({message:err.message})
    }
})
router.patch("/updatestudent/:id",async(req,res)=>{
    // const update= req.body
    // const _id= req.params.id
    const _id= req.params.id
    try{
    const student= await Student.findById({_id:_id});
    console.log(student)
    if(!student){
        res.status.json({message:"student is not found"})
    }
    
        const Updatestudent= await Student.findOneAndUpdate({_id},req.body)
        console.log(Updatestudent)
        res.json({message:"user is updated successfully"})

    
    }catch(err){console.log(err)
        console.log(err)
        res.status(401).json({mesage:err.message})

    }


})
router.post("/attendance",async(req,res)=>{
    let time= new Date();
   let hours= time.getHours();
   console.log(hours)
let timenew= 17;
let time2= 8;
    try{
     const finduser= await Student.findOne({rollno:req.body.rollno})
     
     if(!finduser){
        res.json("user not find sucessfully")
     }else{if(hours==timenew){
        res.json({message:"user is present"});}
        else if(time2==hours){
        res.json({message:"student is present"})
        }
        else{
            res.json({message:"your time is out"});
        }
     }
    }catch(err){
        res.json({message:err.message})
    }
})

router.post('/attendance/login', async (req,res)=>{
    const password= req.body.password;
    const cpassword= req.body.cpassword;
    const email= req.body.email;

    const  registeruser= await Student.findOne({email:req.body.email});
    console.log(registeruser)
    try{
    if(!registeruser){
        res.json({message:"please register yourself and make the attendance"});
    }
    if(password===cpassword){
        var validuser= await bcrypt.compare(password,registeruser.password);
    if(!validuser){
        res.json({message:"please enter your email and password correct"})
    }
        const token= await registeruser.generateAuthtoken();
        console.log(token);
        res.cookie("jwt",token,{expire:new Date(Date.now()+10*24*60*60*1000)});
        res.json({message:"login completed"});
    

    }
}catch(err){
    res.status(401).json({message:err.message});
    console.log(err)
}
})
router.get("/takeclass",isAuthenicated,async(req,res)=>{
    try{
        res.send({message:"welcome to the classs"})
    }catch(err){
        res.send({ message:err.message});
        console.log(err);
    }
})


module.exports= router;