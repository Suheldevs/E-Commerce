const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
    ProductName:{type:String,required:true},
    ProductPrice:{type:String,required:true},
    ProductDescription:{type:String,required:true},
    ProductCategory:{type:String,required:true},
    ProductImage:{type:String}
})

const ProductModel = mongoose.model('Products',sliderSchema);

module.exports = ProductModel;