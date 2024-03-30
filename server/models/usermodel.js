const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config({path : '../.env'})

const ngoSchema = new mongoose.Schema({
    ngoName : {
        type : String
    },
    ngoAddress : {
        type : String
    },
    foundationId : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    pickupPartners : [
        {
            name : {
                type : String,
            },
            contact : {
                type : Number
            }
        }
    ]
})
const hotelSchema = new mongoose.Schema({
    donorName : {
        type : String
    },
    
    email : {
        type : String
    },
    password : {
        type : String
    },
    restraunts : [
       { 
            name : {
            type : String
            },
            licenseNumber : {
                type : String
            },
            address: {
                type : String
            }
       }
    ],
    donations : [
        {
            dish : {
                type : String
            },
            veg_nonveg : {
                type : String
            },
            prepHours : {
                type : Number
            },
            quantity : {
                type : Number
            },
            status : {
                type : String
            }
        }
    ]
})

ngoSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12)
        }
    next()
})

hotelSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12)
        }
    next()
})

ngoSchema.methods.generateNGOTokens = async function (res) {
    try{
        const token = jwt.sign({_id:this._id}, process.env.SECRET_KEY )
        res.cookie('jwtoken', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict', //ssr attcaks
            expires: new Date(
                Date.now() + 30*  24 * 60 * 60 * 1000
            )
        })

        return token
    }catch(err){
        console.log("Error at token generation", err)
    }
}
hotelSchema.methods.generateDonorTokens = async function (res){
    try{
        // console.log("HotelID:", this._id);
        const token = jwt.sign( { _id: this._id }, process.env.SECRET_KEY)
        res.cookie('jwtoken', token, { 
            httpOnly: true,
            secure: false,
            sameSite: 'strict', //ssr attcaks
            expires: new Date(
                Date.now() + 30*  24 * 60 * 60 * 1000
            )
        })

        return token
    }catch(err){
        console.log("Error at token generation", err)
    }
}

const NGO = mongoose.model('ngo', ngoSchema)
const HOTEL = mongoose.model('hotel', hotelSchema)




module.exports = {NGO,HOTEL};
