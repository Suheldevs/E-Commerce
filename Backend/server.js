const express = require('express');
const dotenv  = require('dotenv');
const connectDb = require('./config/db');
const cors = require('cors')
const app = express();
const userRouter = require('./routes/userRoutes')
//load environment var from .env

dotenv.config();

//db connection
connectDb();
app.use(cors());
//middlewarw for parsing json
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Api is running');
})

//define the Port
const PORT = process.env.PORT || 3000;
//start the server
app.listen(PORT,()=>{
    console.log(`sever is running on port ${PORT}`);
})

//user router

app.use('/user',userRouter);