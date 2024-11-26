const slider = require('../models/slidermodel');

const postSlider = async(req,res)=>{
    try{
        const {sliderName} = req.body;
        const sliderImageName = req.file ? req.file.filename : null; 
        if(!sliderName){
            return res.status(400).json({message:'All field is required'})
        }
        const newSlider =new slider({
            sliderName,
            sliderImage:sliderImageName,
        })

        const newSliderData = await newSlider.save();
        if(newSliderData){
            return res.status(200).json({message:'slider save successufy!',sliderData:newSliderData})
        }
    res.status(400).json({message:'Server Error'})
        

    }
    catch(err){
        res.status(500).json({message:'Internal server Error'})
    }
}

const getSlider = async(req,res)=>{
    try{
      const sliderData = await slider.find();
      if(sliderData){
        return res.status(200).json({message:'data fetch successfully', sliderData:sliderData})
      } 
      res.status(400).json({messsage:'data not fetch'})
    }
    catch(err){
        res.status(500).json({message:'Internal server Error'})
    }
}

const deleteSlider = async(req,res)=>{
    try{
        const {id} = req.params;
        const matchSlider = await slider.findByIdAndDelete(id);
        if(!matchSlider){
            return res.status(400).json({message:'Request Error'});
        }
        res.status(200).json({message:'Slider Data Delete successfully!'});
    }
    catch(err){
        res.status(500).json({message:'Internal Server Error',Error: err});
    }
}

module.exports = {postSlider,getSlider,deleteSlider}