const jwt = require('jsonwebtoken')
const {NGO, HOTEL} = require('../models/usermodel.js')
const asyncHandler = require('express-async-handler')
require('dotenv').config({path : '../.env'})

exports.authenticateDonor = asyncHandler(async(req,res,next) => {
 try{
     //Cookies.get('username')
    let token = req.cookies.jwtoken
    
   if(token)
   {
   // let token = req.headers.authorization.split(" ")[1];
    console.log("auth token:" , token)
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    
      const rootUser = await HOTEL.findById(decoded._id);
      if(!rootUser){
        console.log("User not found")
    
    }
      
    // req.token = token
    req.rootUser = rootUser
    // req.userId = rootUser._id
    next()
   }
    
  }
  catch(e){
    console.log("Error: ", e)
    return res.json({ status:300, msg: "Unauthorized"})
  }
})

exports.authenticateNgo = asyncHandler(async(req,res,next) => {
    try{
        //Cookies.get('username')
       let token= req.cookies.jwtoken
   
      if(token)
      {
      // let token = req.headers.authorization.split(" ")[1];
       console.log("auth token:" , token)
   
       const decoded = jwt.verify(token, process.env.SECRET_KEY)
       const rootUser = await NGO.findById({_id:decoded._id})
   
       if(!rootUser){
           throw new Error("User not found")
       }
   
       req.token = token
       req.rootUser = rootUser
       req.userId = rootUser._id
       next()
      }
       
     }
     catch(e){
       console.log("Error: ", e)
       return res.json({ status:300, msg: "Unauthorized"})
     }
   })