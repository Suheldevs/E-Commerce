const { logoModel } = require('../models/logomodel');

const addLogo = async (req, res) => {
    try {
       
        const { name } = req.body;
        const filePath = req.file ? req.file.filename : null;
        if (!req.file) {
            return res.status(400).json({ message: 'File not uploaded' });
        }
        if (!name) {
            return res.status(400).json({ message: 'Name field is required' });
        }

      
        const newLogo = new logoModel({
            name,
            image: filePath, 
        });

        const newData = await newLogo.save();

        res.status(200).json({
            message: 'Logo saved successfully',
            logoData: newData,
        });
    } catch (err) {
        
        console.error('Error saving logo:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message,
        });
    }
};

const getLogo = async(req,res)=>{
    try{
        const logo = await logoModel.find();
        if(!logo){
            return res.status(400).json({message:"LOgo Not Found!"})
        }
        res.status(200).json({message:'logo fetch successfully',logoData:logo})
    }
    catch(err){
        res.status(500).json({message:'logo not fetch ',Error:err})
    }
}

module.exports = { addLogo ,getLogo};