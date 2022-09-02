const jwt= require('jsonwebtoken');
const Student= require("../schema/student");

const isAuthenicated= async(req,res,next)=>{
    try{
        const token= req.cookies.jwt;
        if(!token){
            res.json({message:"user is not valid please login again"})
        }
        else{
        const verifyUser= jwt.verify(token,process.env.KEY);
        if(!verifyUser){
            res.json({message:"server errror"})
        }
        const authenciatedUser= await Student.findOne({_id:verifyUser._id});
        console.log(authenciatedUser);
        next();
         req.user= authenciatedUser;
         req.token= token;}

    }catch(err){
        res.send({message:err.message})
        console.log(err)
    }
}
module.exports= isAuthenicated;