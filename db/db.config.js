const mongoose = require('mongoose')

function conectToDb(){

    return mongoose.connect('mongodb://localhost:27017/jm',{

        useNewUrlParser:true,
        UseUnifiedTopology:true,
    })

}

module.exports = conectToDb