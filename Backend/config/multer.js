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

const uploadDirForProduct = path.join(__dirname,'../uploads/products');

if(!fs.existsSync(uploadDirForProduct)){
    fs.mkdirSync(uploadDirForProduct,{recursive:true});
}


const storageForProduct = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadDirForProduct);
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'_'+file.originalname);
    }
});

const uploadForProduct = multer({storage:storageForProduct})


const uploadDirForCategory = path.join(__dirname,'../uploads/category');

if(!fs.existsSync(uploadDirForCategory)){
    fs.mkdirSync(uploadDirForCategory,{recursive:true});
}


const storageForCategory = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadDirForCategory);
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'_'+file.originalname);
    }
});

const uploadForCategory = multer({storage:storageForCategory})

module.exports = {upload,uploadForProduct,uploadForCategory}