const router = require('express').Router()


const userService = require('../service/user.service')
const isAuth = require('../auth/isAuth')

router.post('/sign',async(req,res)=>{
    try{

    const UserService = new userService(req.body)

const regexemail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;

const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g

if(!UserService.isValid(UserService.email,regexemail)){
    return res.status(400).json({
        error: "O campo email é obrigatório e deve ser um email válido",
      });
}

if(!UserService.isValid(UserService.password,regexPassword)){
    return res.status(400).json({
        error: "O campo password é obrigatório e deve ser um email válido",
      });
}

/* if(UserService.userValid(req.body.email)){

    return res.status(400).json({
        error: "usuario nao valido",
      });
} */


    const newInsert = await UserService.createUser()

    return res.status(201).json(newInsert)
    }catch(err){
        console.log(err)
    }
})

router.post('/login',async(req,res)=>{
    try{

    const UserService = new userService(req.body)


    const loginResult = await UserService.login()

    if (loginResult) {
        return res.status(200).json(loginResult);
      } else {
        // O status 401 significa Unauthorized
        return res.status(401).json({ error: "Usuário ou senha errado." });
      }
    }catch(err){
        console.log(err)
    }
})


router.get("/profile", isAuth, async(req, res, next) => {
    try {
      console.log(req.user);
  
      return res.status(200).json(req.user);
    } catch (err) {
     console.log(err)
    }
  });

  

module.exports = router