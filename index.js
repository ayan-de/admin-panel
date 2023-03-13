const express = require('express')
const bodyParser = require('body-parser')
let dotenv = require('dotenv')
let mongoose = require('mongoose')
const { route } = require('./route/backend/admin')
const methodOverride = require('method-override')
const pageModel = require('./model/pageModel')


//configuring dotenv file
dotenv.config({path:'./config.env'})

const app = express()

//database connection
mongoose.connect(process.env.mongnUrl)

//overriding
app.use(methodOverride('_method'))


//routing done for backend
const admin = require('./route/backend/admin')
const page = require('./route/backend/page')
//route rendering
app.use('/admin',admin)
app.use('/admin/page',page)


//routing done for frontend
const header = require('./route/frontend/header')
app.use('/',header)


//setting template engine
app.set('view engine','ejs')

//enabling body-parser
app.use(bodyParser.urlencoded({extended:true}))

//setting static file
app.use(express.static(__dirname+"/public/"))



app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})