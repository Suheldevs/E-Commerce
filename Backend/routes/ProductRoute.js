const express = require('express');
const router = express.Router();
const {saveProduct,getproduct,deleteProduct,updateProduct} = require('../controllers/ProductController')
const {upload,uploadForProduct} = require('../config/multer')
router.post('/save',uploadForProduct.array('ProductImages',5),saveProduct);
router.get('/get',getproduct);
router.delete('/delete/:id',deleteProduct);
router.put('/update/:id',updateProduct);

module.exports = router;