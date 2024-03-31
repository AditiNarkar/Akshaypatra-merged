require ('../config/db.js')
const brcypt = require('bcryptjs')
const {NGO, HOTEL} = require('../models/usermodel.js')
require('dotenv').config({path : '../.env'})


exports.registerNgo = async(req,res) => {
   
    const {ngoName, ngoAddress, foundationId, email, password} = req.body
    if (!ngoName || !ngoAddress || !foundationId || !email || !password){
        return res.status(400).json({msg: "Please fill all fields"})
    }
    try {
        const ngoExist = await NGO.findOne({foundationId: foundationId})

        if(ngoExist){
            return res.status(422).json({msg : "NGO already exists"})
        }
        const newNgo = new NGO({ngoName: ngoName, ngoAddress: ngoAddress, foundationId: foundationId, email: email, password: password})
        await newNgo.save()

        if(!newNgo){
            res.json({status:500 ,msg:"Error creating NGO "})
        }
        res.json({status:201, msg:"NGO added succesfully"})
    }
    catch(err){
        console.log("Error at signup", err)
    }
}
exports.registerDonor = async(req,res) => {

    const {donorName, email, password} = req.body
    if(!donorName || !email || !password ){
        return res.status(400).json({msg: "Please fill all fields"})
    }
    try{
        
        const donorExist =   await HOTEL.findOne({email: email}) 
        if (donorExist){
            return res.status(422).json({msg : "Donor profile already exists"})

        }
        const newDonor = new HOTEL({donorName: donorName, email: email, password: password})
        await newDonor.save()

        if(!newDonor){
            res.json({status:500 ,msg:"Error creating Donor profile "})
        }
        res.json({status:201, msg:"Donor profile added succesfully"})
    }
    catch(err){
        console.log("Error at donor signup", err)
    }
}
exports.login = async(req,res) => {

    const {identity, email, password} = req.body
    // console.log("from login backend identity: ", identity)

    if(!identity || !email || !password ) {
        return res.status(400).json({msg: "Please fill all fields"})
    }

   try{

        switch(identity.toLowerCase()) {
            case "donor":
                const donorExist = await HOTEL.findOne( {email: email})
                // console.log("donorExist:", email, " ", donorExist)

                if(!donorExist){
                    return res.json({msg : "Account not found"})
                }
                const matchDonorPassword = await brcypt.compare(password, donorExist.password)
                if(!matchDonorPassword) {
                    return res.json({ msg: "Invalid Password"})
                }
                const donorToken = await donorExist.generateDonorTokens(res)
                console.log("Your generated token is: ",donorToken)
                // console.log("Cookies: ", req.cookies)
                return res.json({status:200, msg:"Logged in", token:donorToken, donorExist:donorExist, identity: "donor"})

            case "ngo":
                const ngoExist = await NGO.findOne( {email: email })
                if(!ngoExist){
                    return res.json({msg : "Account not found"})
                }
                const matchNgoPassword = await brcypt.compare(password, ngoExist.password)
                if(!matchNgoPassword) {
                    return res.json({ msg: "Invalid Password"})
                }
                const ngoToken = await ngoExist.generateNGOTokens(res)
                console.log("Your generated token is: ",ngoToken)
                return res.json({status:200, msg:"Logged in", token:ngoToken, ngoExist:ngoExist, identity: "ngo"})
        
        }

    }catch(err){
    console.log("Error at login", err)
    }
        
}

// exports.pickupRestaurant = async(req,res)=>{

//     const {name, licenseNumber, address} = req.body
//     console.log("addresto: ", name, licenseNumber, address)
//     if(!name || !licenseNumber|| !address ){
//         return res.status(400).json({msg: "Please fill all fields"})
//     }
//     try{

//         const isDonor = await HOTEL.findOne( {_id:req.rootUser._id})
//         if ( !isDonor ){
//             return res.status(500).json({msg: " Unauthorized. "})
//         }

//         const restoExist = await HOTEL.findOne( {_id:req.rootUser._id,'restraunts.licenseNumber': licenseNumber} )
//         if (restoExist) {
//             return res.status(422).json({msg : "Restaurant already exists"})
//         }
//         const newRestaurant = {
//             name : name, 
//             licenseNumber: licenseNumber,
//             address : address, 
//         }
//         const hotel = await HOTEL.findOneAndUpdate({ _id:req.rootUser._id }, {$push : {restraunts : newRestaurant}}, {new : true})

//         const restaurantIndex = hotel.restraunts.length - 1
    
//         const appendedrestaurant = hotel.restraunts[restaurantIndex]
//         if (!hotel) {
//             return res.status(500).json({ status: 500 , msg: "Error adding Restaurant" });
//         }

//         res.status(201).json({ status: 201, msg: "Restaurant added successfully" });
//     }
//     catch(err){
//         console.log("Error at adding Restaurants", err)
//     }
// }

// exports.donorDetails = async(req,res)=> {
//     const {dish, veg_nonveg, prepHours, quantity} = req.body

//     if(!dish || !veg_nonveg || !prepHours || !quantity){
//         return res.status(400).json({msg: "Please fill all fields"})
//     }

//     try{
//         const donor = await HOTEL.findOne({_id:req.rootUser._id})

//         if(!donor){
//             return res.status(500).json({ status: 500 , msg: "Unauthorized access to donation page" });
//         }

//         const addDonation = {
//             dish: dish,
//             veg_nonveg: veg_nonveg, 
//             prepHours: prepHours,
//             quantity: quantity
//         }
//         const donation = await HOTEL.findOneAndUpdate({_id:req.rootUser._id},{$push : {donations : addDonation}}, {new : true} )
//         const donationIndex = donation.donations.length - 1
    
//         const appendedDonation = donation.donations[donationIndex]
//         if (!donation) {
//             return res.status(500).json({ status: 500 , msg: "Error adding Donation" });
//         }

//         res.status(201).json({ status: 201, msg: "Donation added successfully" });
//     }catch(err){
//         console.log("Error at adding donations", err)
//     }
// }
