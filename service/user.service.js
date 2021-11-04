const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const userModel = require('../model/user.model')


class userService{


    constructor(user){

      
        this.email= user.email
        this.password=user.password

        
    }

 isValid(value,regex){
        if(!value||!value.match(regex)){

            return false
        }

        return true
    }


    async userValid(email){

        const resp = await userModel.findOne({email:email})

        if(resp){
            return true
        }
            return false
        
    }


    async getUserByEmail(email){

        const user = await userModel.findOne({email:email})
console.log("---->"+user)
        return user
    }


 hashPassword(plaintext){
  
            const saltRounds = 10
            const salt = bcrypt.genSaltSync(saltRounds)
            const passwordHashed=  bcrypt.hashSync(plaintext,salt)
    
            return passwordHashed
        }
    
 

    async createUser(){

        return userModel.create({
            email:this.email,
            passwordHash:  this.hashPassword(this.password)
        }).then((insertNew)=>insertNew)

    }

 
    generateToken(user){

        const signSecret = process.env.TOKEN_SIGN_SECRET

        delete user.passwordHash

        const token = jwt.sign(user.toJSON(),signSecret,{expiresIn:"6h"})

        return token
    }

    async login(){

        const user = await this.getUserByEmail(this.email)

        if(!user){

            throw new Error('usuario nao')
        }

        if( await bcrypt.compare(this.password,user.passwordHash)){

            const token  = this.generateToken(user)

            return {token:token, user:user}
        }

        return false
    }



}


module.exports = userService