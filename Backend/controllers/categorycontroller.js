const Category = require('../models/categorymodel')

const addCategory = async(req,res)=>{
    try{
        const {name} = req.body;
       
        const newCategory = new Category({name});
        await newCategory.save();
        return res.status(200).json({message:'Category save successfully',category:newCategory})
    }
    catch(err){
 res.status(500).json({message:'Internal server error',Error:err});
    }
}

const getCategory = async(req,res)=>{
    try{
        const categoryData = await Category.find();
        if(!categoryData){
            return res.status(404).json({message:"data not found"});
        }
        return res.status(201).json({message:"data get successfully",categories:categoryData});
    }
    catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
}

const deleteCategory = async(req,res)=>{
    try{
        const {id} = req.params;
        const matchCategory = await Category.findByIdAndDelete(id);
        if(!matchCategory){
            return res.status(400).json({message:'Request Error'});
        }
        res.status(200).json({message:'Category Delete successfully!'});
    }
    catch(err){
        res.status(500).json({message:'Internal Server Error',Error: err});
    }
}

module.exports = {addCategory,getCategory,deleteCategory};