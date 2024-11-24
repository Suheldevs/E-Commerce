const express = require('express')
const router = express.Router();
const {addCategory,getCategory,deleteCategory}  = require('../controllers/categorycontroller');
router.post('/add',addCategory);
router.get('/get',getCategory);
router.delete('/delete/:id',deleteCategory);

module.exports = router;