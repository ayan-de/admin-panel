const express = require('express')
var router = express()
const pageModel = require('../../model/pageModel')
let catModel = require('../../model/categorymodel')


router.use((req, res, next)=>{

    catModel.find({}).count()
    .then((x)=>{
        res.locals.noofcat =x
    })


    // pageModel.find({}).count()
    // .then((x)=>{
    //     res.locals.noOfPage =x
    // })


    next()
})

router.get('/',(req,res) =>{
    pageModel.find({}).count()
    .then((x) =>{
        res.render('../views/backend/admin-file',{x})
    })
    .catch((y) =>{
        console.log(y);
    })
})


module.exports = router