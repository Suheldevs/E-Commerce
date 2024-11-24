const mongoose = require('mongoose');

const logoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String }
})

const logoModel = mongoose.model('logo', logoSchema);

module.exports = { logoModel }