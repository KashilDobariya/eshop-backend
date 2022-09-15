const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock:{
        type: Number,
        require:true
    }
})

exports.Prodcut = mongoose.model('Product'.productSchema);
