const express = require('express');
const dotenv  = require('dotenv');
const connectDb = require('./config/db');
const cors = require('cors')
const app = express();
const path = require('path');
const logoRouter = require('./routes/logoroute')
const userRouter = require('./routes/userRoutes')
const categoryRouter = require('./routes/categoryroute')
const sliderRouter = require('./routes/sliderroute')
const ProductRouter = require('./routes/ProductRoute')
//load environment var from .env
dotenv.config();
//upload file creation if needed


//db connection
connectDb();
app.use(cors());
//middlewarw for parsing json
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//define the Port
const PORT = process.env.PORT || 3000;
//start the server
app.listen(PORT,()=>{
    console.log(`sever is running on port ${PORT}`);
})

//user router

app.use('/user',userRouter);
app.use('/category',categoryRouter)
app.use('/logo',logoRouter);
app.use('/slider',sliderRouter);
app.use('/product',ProductRouter)