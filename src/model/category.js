const mongoose = require('mongoose')

const categorySchema=new mongoose.Schema({
    name:{
        type: String
    },
    quantity: {
        type: Number
    },
    description: {
        type: String
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
})

const categories=mongoose.model('categories', categorySchema)
module.exports=categories;