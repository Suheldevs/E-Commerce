const express = require('express');
const router = express.Router();
const {saveProduct,getproduct,deleteProduct} = require('../controllers/ProductController')
const {upload} = require('../config/multer')
router.post('/save',upload.single('ProductImage'),saveProduct);
router.get('/get',getproduct);
router.delete('/delete/:id',deleteProduct);

module.exports = router;