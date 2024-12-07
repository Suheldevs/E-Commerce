const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
    ProductCategory: { type: String, required: true },
    ProductName: { type: String, required: true },
    ProductPrice: { type: String, required: true },
    ProductDescription: { type: String, required: true },
    ProductBrand: { type: String, required: true },
    ProductImage: { type: Array }
})

const ProductModel = mongoose.model('Products', sliderSchema);

module.exports = ProductModel;