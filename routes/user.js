const { response } = require('express');
var express = require('express');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
 res.render('user/index')
});

// page used for landing 
router.get('/login',(req,res)=>{
  if(req.session.logIn){
    res.redirect('/')
  }else{
  res.render('user/login',{'loginErr':req.session.LoginErr})
  req.session.loginErr = false
  }
})
// page used for landing 
router.get('/signup',(req,res)=>{
  res.render('user/signup')
})
// function for Not existing user
// To ccreate a Account  
router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
    console.log(response);
    res.redirect('login')
    // req.session.logIn = true
    // req.session.user = response
    // res.redirect('/')
  })
})
//Function Work according to user is is true or false (cridentials)

router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.logIn = true;
      req.session.user = response.user
      res.redirect('/')
    }else{
      req.session.LoginErr = true
      res.redirect('login')
    }
  })
})
//For logout from an account 
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('login')
})

module.exports = router;
