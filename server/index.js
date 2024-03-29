const express = require('express')
require('dotenv').config({path : '../.env'})
const userRoutes = require('./routes/usercontroller.js')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json());

const connectDB = require('./config/db.js')
connectDB()

app.use("/api", userRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Running at", PORT)
})

