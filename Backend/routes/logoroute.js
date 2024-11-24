const express = require('express')
const {addLogo,getLogo} = require('../controllers/logocontroller');
const router = express.Router();
const {upload} = require('../config/multer')
router.post('/add',upload.single('image'),addLogo);
router.get('/get',getLogo);

module.exports = router;