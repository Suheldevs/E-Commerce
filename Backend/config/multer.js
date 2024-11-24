const multer = require('multer');
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();



const uploadDir = path.join(__dirname,'../uploads');

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{recursive:true});
}


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadDir);
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'_'+file.originalname);
    }
});

const upload = multer({storage:storage})

module.exports = {upload}