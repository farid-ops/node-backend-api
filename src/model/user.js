const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

const user = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

user.plugin(validator)

module.exports=mongoose.model('user', user);
