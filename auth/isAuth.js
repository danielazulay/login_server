const jwt = require('express-jwt')

function headTokenExtract(req,res){

    if(!req.headers.authorization){
        throw new Errror('nao autorizado')
    }

    return req.headers.authorization.split(" ")[1]
}


module.exports = jwt({
    userProperty:"user",
    secret:process.env.TOKEN_SIGN_SECRET,
    getToken:headTokenExtract,
    algorithms:["HS256"]
})