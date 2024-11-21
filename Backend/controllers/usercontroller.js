const User = require('../models/usermodels');

const postUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const matchEmail = await User.findOne({email}) 
        if(matchEmail){
            return res.status(400).json({message:'Email is already exist, please Log-in'})
        }
        const user = new User({name,email,password});
        await user.save();
        return res.status(200).json({message:'User signup successfully',userData:user})
    }
    catch(err){
 res.status(500).json({message:'Internal server error',Error:err});
    }
}

const loginUser = async(req,res)=>{
    try{
 const {email,password}=req.body;
 const matchUser = await User.findOne({email});
 if(!matchUser){
    return res.status(400).json({message:'Not a valid email OR user not signin yet!'});
 }
 if(matchUser.password != password ){
    return res.status(400).json({message:'Enter a valid Password'});
 }
 res.status(201).json({message:'Sign In Successfully',userData:matchUser});
    }
    catch(err){
        res.status(500).json({message:'Internal Error'});
    }
}
module.exports = {postUser,loginUser}