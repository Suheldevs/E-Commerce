const Product = require('../models/Productmodel');

const saveProduct = async(req,res)=>{
    try{
        const {ProductName,ProductCategory,ProductDescription,ProductPrice,ProductBrand} = req.body;
        const ProductImages = req.files;
        if(!ProductImages){
            return res.status(400).json({message:'Product Images is Required'})
        } 
        if(!ProductName || !ProductCategory || !ProductDescription || !ProductPrice || ProductName =='' || ProductPrice == ''){
            return res.status(400).json({message:'All field is required'})
        }
        const images = ProductImages.map((item)=>item.filename)
        const newSlider =new Product({
            ProductName,
            ProductCategory,
            ProductPrice,
            ProductBrand,
            ProductDescription,
            ProductImage:images,
        })

        const newProductData = await newSlider.save();
        if(newProductData){
            return res.status(200).json({message:'slider save successufy!',productData:newProductData})
        }
    res.status(400).json({message:'Server Error'})
        

    }
    catch(err){
        res.status(500).json({message:'Internal server Error'})
    }
}


const getproduct = async(req,res)=>{
    try{
      const ProductData = await Product.find();
      if(ProductData){
        return res.status(200).json({message:'data fetch successfully', ProductData})
      } 
      res.status(400).json({messsage:'data not fetch'})
    }
    catch(err){
        res.status(500).json({message:'Internal server Error'})
    }
}

const deleteProduct = async(req,res)=>{
    try{
        const {id} = req.params;
        const matchSlider = await Product.findByIdAndDelete(id);
        if(!matchSlider){
            return res.status(400).json({message:'Request Error'});
        }
        res.status(200).json({message:'Product Data Delete successfully!'});
    }
    catch(err){
        res.status(500).json({message:'Internal Server Error',Error: err});
    }
}

const updateProduct = async(req,res)=>{
    try{
        const {id} = req.params;
        if(!id){
            return res.status(400).json({message:'Project Not Found'})
        }
        const body = req.body;
        if(!body){
            return res.status(400).json({message:'All field required'})
        }
        const updatedProduct = await Product.findByIdAndUpdate(id,body,{new:true})
        if(updatedProduct){
            return res.status(200).json({message:'Product Updated succefully',updateProduct:updatedProduct})
        }
        return res.status(200).json({message:'Product not Updated '});
    }
    catch(err){
        res.status(500).json({message:'Internal Server Error',Error: err});
    }
}

module.exports = {saveProduct,getproduct,deleteProduct,updateProduct}