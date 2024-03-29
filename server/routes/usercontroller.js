const express = require('express');
const router = express.Router();
const {registerNgo, registerDonor,login,pickupRestaurant, donorDetails} = require('../services/functions.js')
const {authenticateDonor, authenticateNgo} = require('../middleware/authenticate.js')
const {NGO, HOTEL} = require('../models/usermodel.js')


// Define routes

router.post('/registerNgo',registerNgo)
router.post('/registerDonor',registerDonor)
router.post('/login',login)
router.route('/pickupRestaurant')
.get(authenticateDonor, (req,res)=> res.status(200).json({rootUser:req.rootUser}))
.post(authenticateDonor, pickupRestaurant)
//router.get


router.route('/donationDetails')
.get(authenticateDonor, (req,res) => {res.status(200).json({rootUser:req.rootUser})})
.post(authenticateDonor, donorDetails)


module.exports = router;