const express = require('express')
var router = express()
const pageModel = require('../../model/pageModel')
let catModel = require('../../model/categorymodel')
let productModel = require('../../model/productModel')



router.use((req, res, next)=>{

    catModel.find({}).count()
    .then((x)=>{
        res.locals.noofcat =x
    })


    pageModel.find({}).count()
    .then((x)=>{
        res.locals.noOfPage =x
    })


    next()
})

router.get('/', (req, res)=>{
    productModel.find({}).count()
    .then((noofcourse)=>{
        res.render('../views/backend/admin-File.ejs',{noofcourse})
    })
})




module.exports = router