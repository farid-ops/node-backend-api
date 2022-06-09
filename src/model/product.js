const mongoose = require('mongoose')

const productschema = new mongoose.Schema({
    title:{
        type: String
    },
    description:{
        type: String
    },
    imageUrl:{
        type: String
    },
    price:{
        type: Number
    },
    userId:{
        type: String
    }
})

const product = mongoose.model('products', productschema)
module.exports=product