let express = require('express')
let router = express()
const pageModel = require('../../model/pageModel')


router.get('/', (req, res) => {
    res.render('../views/frontend/index')
  })

  router.get('/pages/:id',(req,res) =>{
    pageModel.findOne({pageUrl : req.params.id})
    .then((x)=>{
      // console.log(`the data is ${x}`);
      res.render('../views/frontend/dynamic-page',{x})
    })
    .catch((y) =>{
      console.log(`the error is ${y}`);
    })
  })
  
  module.exports = router