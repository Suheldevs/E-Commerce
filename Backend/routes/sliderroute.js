const express = require('express');
const router = express.Router();
const {upload} = require('../config/multer')
const {postSlider,getSlider,deleteSlider} = require('../controllers/slidercontroller')
router.post('/post',upload.single('sliderImage'),postSlider);
router.get('/get',getSlider);
router.delete('/delete/:id',deleteSlider);

module.exports = router;