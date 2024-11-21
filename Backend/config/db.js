const mongoose = require('mongoose');

const connectDb = async () => {
    if (!process.env.MONGO_URI) {
        console.log('Error:MONGO_URI is not define in .env')
        process.exit(1);
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log('db connected'))
            .catch((err) => console.log(err));
    }
    catch (err) {
        console.log(err.massage)
    }
}
module.exports = connectDb