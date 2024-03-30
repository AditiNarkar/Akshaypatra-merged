const express = require('express');
const router = express.Router();
const {registerNgo, registerDonor,login,pickupRestaurant, donorDetails} = require('../services/functions.js')
const {authenticateDonor, authenticateNgo} = require('../middleware/authenticate.js')
const {NGO, HOTEL} = require('../models/usermodel.js')

router.post('/registerNgo',registerNgo)
router.post('/registerDonor',registerDonor)
router.post('/login',login)

// router.route('/pickupRestaurant')
// .get(authenticateDonor, (req,res)=> res.status(200).json({rootUser:req.rootUser}))
// .post(authenticateDonor, pickupRestaurant)


router.post('/pickupRestaurant', authenticateDonor, async(req,res)=>{

        const {name, licenseNumber, address} = req.body
        console.log("addresto: ", name, licenseNumber, address)
        if(!name || !licenseNumber|| !address ){
            return res.status(400).json({msg: "Please fill all fields"})
        }
        try{
    
            const isDonor = await HOTEL.findOne( {_id:req.rootUser._id})
            if ( !isDonor ){
                return res.status(500).json({msg: " Unauthorized. "})
            }
    
            const restoExist = await HOTEL.findOne( {_id:req.rootUser._id,'restraunts.licenseNumber': licenseNumber} )
            if (restoExist) {
                return res.status(422).json({msg : "Restaurant already exists"})
            }
            const newRestaurant = {
                name : name, 
                licenseNumber: licenseNumber,
                address : address, 
            }
            const hotel = await HOTEL.findOneAndUpdate({ _id:req.rootUser._id }, {$push : {restraunts : newRestaurant}}, {new : true})
    
            const restaurantIndex = hotel.restraunts.length - 1
        
            const appendedrestaurant = hotel.restraunts[restaurantIndex]
            if (!hotel) {
                return res.status(500).json({ status: 500 , msg: "Error adding Restaurant" });
            }
    
            res.status(201).json({ status: 201, msg: "Restaurant added successfully" });
        }
        catch(err){
            console.log("Error at adding Restaurants", err)
        }
})

router.route('/donationDetails')
.get(authenticateDonor, (req,res) => {res.status(200).json({rootUser:req.rootUser})})
.post(authenticateDonor, donorDetails)


module.exports = router;