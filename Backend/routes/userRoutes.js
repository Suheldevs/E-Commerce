const express = require('express');
const {postUser,loginUser} = require('../controllers/usercontroller');
const { model } = require('mongoose');
const router = express.Router();
router.post('/signup',postUser);
router.post('/login',loginUser);

module.exports = router;
