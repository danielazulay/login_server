require('dotenv').config()
const express = require('express')
const cors = require("cors");
const app = express()



app.use(express.json())

app.use(cors())

const conectToDb  = require('./db/db.config')

const userRouter = require('./router/user.router')

async function init(){
const db = await conectToDb()
app.use('/',userRouter)

app.listen(process.env.PORT,()=>{
    console.log('conenctado na porta '+ process.env.PORT)
})

}


init()