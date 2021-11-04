const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    email:{type:String},
    passwordHash:{type:String}
})


module.exports = mongoose.model('user',userModel)

