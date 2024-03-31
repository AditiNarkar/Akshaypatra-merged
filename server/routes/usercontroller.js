const express = require('express');
const router = express.Router();
const {registerNgo, registerDonor,login,pickupRestaurant, donorDetails} = require('../services/functions.js')
const {authenticateDonor, authenticateNgo} = require('../middleware/authenticate.js')
const {NGO, HOTEL} = require('../models/usermodel.js')
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

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

router.get('/pickupRestaurant', authenticateDonor, async(req,res)=>{
        try{
            const isDonor = await HOTEL.findOne( {_id:req.rootUser._id})
            if ( !isDonor ){
                return res.status(500).json({msg: " Unauthorized. "})
            }
    
            res.status(201).json({ status: 201, restos: isDonor.restraunts });
        }
        catch(err){
            console.log("Error at getting Restaurants", err)
        }
})

router.delete('/pickupRestaurant', authenticateDonor, async(req,res)=>{
        try{
                const {restoId} = req.body
                console.log("restoID:", restoId, " donor: ", req.rootUser._id)

                const isDonor = await HOTEL.findOne( {_id:req.rootUser._id})

                if ( !isDonor ){
                        return res.status(500).json({msg: " Unauthorized. "})
                }
                const restaurantIndex = isDonor.restraunts.findIndex(
                        restaurant => restaurant._id.toString() === restoId
                );

                if (restaurantIndex === -1) {
                        return res.status(422).json({ msg: "Restaurant not found for the user "});
                }

                isDonor.restraunts.splice(restaurantIndex, 1);

                await isDonor.save();

                res.status(201).json({ status: 201, msg: "Deleted" });
        }
        catch(err){
                console.log("Error at getting Restaurants", err)
        }
})

router.post('/addDonation', authenticateDonor, async(req,res)=> {

        let {restoID, donation} = req.body
    
        for (const item of donation) {
                for (const key in item) {
                    if (item.hasOwnProperty(key) && item[key].trim() === '') {
                        console.log(`Empty field "${key}" found in donation:`, item);
                        return res.status(400).json({msg: "Please fill all fields"}); 
                    }
                }
        }
    
        //try{
                const donor = await HOTEL.findOne({_id:req.rootUser._id})
        
                if(!donor){
                        return res.status(500).json({ status: 500 , msg: "Unauthorized access to donation page" });
                }
                
                
                donation = donation.map(d => {
                        // Create a new object with existing properties and a new `_id` field
                        return Object.assign({}, d, { _id: new mongoose.Types.ObjectId() });
                });

                const restaurant = donor.restraunts.find(restaurant => restaurant._id.equals(restoID));
                console.log("restaurant", restaurant)

                if (!restaurant) {
                        return res.status(400).json({msg: "Resto Not Found"});
                }
                restaurant.donations.push(donation);

                await donor.save();
    
                res.status(201).json({ status: 201, msg: "Donation added successfully" });
        // }
        // catch(err){
        //     console.log("Error at adding donations", err)
        // }
})


module.exports = router;