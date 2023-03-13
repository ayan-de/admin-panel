const express = require('express')
const bodyParser = require('body-parser')
let dotenv = require('dotenv')
let mongoose = require('mongoose')
const { route } = require('./route/backend/admin')
const methodOverride = require('method-override')
const app = express()
const flash = require('connect-flash')
let session = require('express-session');

const pageModel = require('./model/pageModel')
let productModel = require('./model/productModel')
let catModel = require('./model/categorymodel')



//configuring dotenv file
dotenv.config({path:'./config.env'})


//database connection
mongoose.connect(process.env.mongnUrl)

//overriding
app.use(methodOverride('_method'))




//routing done for frontend
const header = require('./route/frontend/header')
app.use('/',header)


//setting template engine
app.set('view engine','ejs')

//enabling body-parser
app.use(bodyParser.urlencoded({extended:true}))

//setting static file
app.use(express.static(__dirname+"/public/"))


app.use(session({
  secret:'nodejs',
  resave:true,
  saveUninitialized:true
}))

//using flash
app.use(flash())

app.use((req, res, next)=>{
  //sucess and local are global variable
  res.locals.sucess = req.flash('sucess') 
  res.locals.err = req.flash('err') 
  
  //PASS PAGE DATA TO ALL FRONTENT HEADER
      pageModel.find({})
      .then((x) => {
          res.locals.navdata = x;         
      })
      .catch((y) => {
         // console.log(y)
      })
  // PASS ALL COURSERS LIST TO ALL COURESE PAGES
      productModel.find({})
      .then((x)=>{
          res.locals.allcourses = x;   
      })
      
  //PASS ALL CATEGORY DATA ANY WHERE
  catModel.find()
  .then((x)=>{
      res.locals.allcat = x
  })

  next()
})

//routing done for backend
const admin = require('./route/backend/admin')
const page = require('./route/backend/page')
let admincategory = require('./route/backend/admin-category')
let adminproducts = require('./route/backend/admin-products')

//route rendering
app.use('/admin',admin)
app.use('/admin/page',page)
app.use('/admin/category/', admincategory)
app.use('/admin/products/', adminproducts)



app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})