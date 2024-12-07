const express = require('express')
const router = express.Router();
const {addCategory,getCategory,deleteCategory}  = require('../controllers/categorycontroller');
const {uploadForCategory} = require('../config/multer')
router.post('/add',uploadForCategory.single('logo'),addCategory);
router.get('/get',getCategory);
router.delete('/delete/:id',deleteCategory);

module.exports = router;