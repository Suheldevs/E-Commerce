const express = require('express')
const {addLogo,getLogo,updateLogo} = require('../controllers/logocontroller');
const router = express.Router();
const {upload} = require('../config/multer')
router.post('/add',upload.single('image'),addLogo);
router.get('/get',getLogo);
router.post('/update/:id',upload.single('image'),updateLogo);

module.exports = router;