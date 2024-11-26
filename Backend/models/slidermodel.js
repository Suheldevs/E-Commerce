const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
    sliderName:{type:String,required:true},
    sliderImage:{type:String}
})

const sliderModel = mongoose.model('sliderModel',sliderSchema);

module.exports = sliderModel;
