let express = require('express')
let router = express()
const pageModel = require('../../model/pageModel')


router.get('/', (req, res) => {
    res.render('../views/frontend/index')
  })

  router.get('/:id', (req, res) => {
    pageModel.findOne({pageUrl:req.params.id})
    .then((x) =>{
      // console.log(x);
      res.render('../views/frontend/dynamic-page', {x})
    })
    .catch((y) =>{
      console.log(y);
    })
  })
  
  module.exports = router