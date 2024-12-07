const express = require('express');
const router = express.Router();
const {saveProduct,getproduct,deleteProduct} = require('../controllers/ProductController')
const {upload,uploadForProduct} = require('../config/multer')
router.post('/save',uploadForProduct.array('ProductImages',5),saveProduct);
router.get('/get',getproduct);
router.delete('/delete/:id',deleteProduct);

module.exports = router;