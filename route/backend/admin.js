const express = require('express')
var router = express()
const pageModel = require('../../model/pageModel')


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