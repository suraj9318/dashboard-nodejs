const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name : String,
    price : Number,
    category : String,
    userId : String,
    company : String
});

const productModel = mongoose.model('products',productSchema);

module.exports = productModel;