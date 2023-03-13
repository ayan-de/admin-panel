const express = require('express')
var router = express.Router()
const pageModel = require('../../model/pageModel')
const multer = require('multer')

const storage = multer.diskStorage({
    destination:'public/backend/images',
    filename : (req,file,cb) => {
        cb(null, file.originalname)
    }
})

let upload = multer({
    storage:storage,
    fileFilter: (req, file, cb) =>{
        if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/gif')
        {
            cb(null,true)
        }
        else{
            cb(null, false)
            return cb(new Error("only jpg jpeg png gif images are allowed"))
        }
    }
})

router.get('/add-page',(req,res) =>{
    res.render('../views/backend/add-page-file')
})

router.get('/edit-page/:id',(req,res) =>{
    pageModel.findOne({pageUrl : req.params.id})
    .then((x) =>{
        res.render('../views/backend/edit-page-file',{x})
    })
    .catch((y) =>{
        console.log(y);
    })
})


router.get('/',(req,res)=>{
    pageModel.find({})
    .then((x)=>{
        // console.log(x);
        res.render('../views/backend/page-file',{x})
       })
    .catch((y)=>{
        console.log(y);
    })
})
    

router.post('/add-page/', upload.single('Page_Photo'), (req,res) =>{

    pageModel.findOne({pageUrl : req.body.Page_Url})
    .then((a) =>{
        if(a){
        console.log(`Duplicate page found use different url`);
        }
        else{
            if(req.file){
                pageModel.create({
                    pageUrl : req.body.Page_Url,
                    pageNavText: req.body.Page_Nav_text,
                    pageTitle: req.body.Page_Title,
                    pageMetaDescrition: req.body.Page_Meta_Description,
                    pageMetaKeyword: req.body.Page_Meta_Keyword,
                    pageHeading: req.body.Page_Heading,
                    pagePhoto: req.file.filename,
                    pageDetails: req.body.Page_Details
                })
                .then((data)=>{
                    // console.log(data
                    //     );
                    res.redirect('/admin/page')
                })
            }
            else{
                pageModel.create({
                    pageUrl : req.body.Page_Url,
                    pageNavText: req.body.Page_Nav_text,
                    pageTitle: req.body.Page_Title,
                    pageMetaDescrition: req.body.Page_Meta_Description,
                    pageMetaKeyword: req.body.Page_Meta_Keyword,
                    pageHeading: req.body.Page_Heading,
                    // pagePhoto: req.file.filename,
                    PageDetails: req.body.Page_Details
                })
                .then((data)=>{
                    req.flash('success',"Your data has been added to the data base")
                    res.redirect('/admin/page')
                })
            }
        }
    })
    
})


router.put('/edit-page/:id',upload.single('Page_Photo'),(req,res) =>{
    if(req.file){
        pageModel.updateOne({pageUrl : req.params.id},{$set:{
            pageUrl : req.body.Page_Url,
            pageNavText: req.body.Page_Nav_text,
            pageTitle: req.body.Page_Title,
            pageMetaDescrition: req.body.Page_Meta_Description,
            pageMetaKeyword: req.body.Page_Meta_Keyword,
            pageHeading: req.body.Page_Heading,
            pagePhoto: req.file.filename,
            pageDetails: req.body.Page_Details
        }})
        .then((x) =>{
            // req.flash('success',"Your data has been UPDATED !!")
            res.redirect('/admin/page/')
        })
    }
    else{
        pageModel.updateOne({pageUrl : req.params.id},{$set:{
            pageUrl : req.body.Page_Url,
            pageNavText: req.body.Page_Nav_text,
            pageTitle: req.body.Page_Title,
            pageMetaDescrition: req.body.Page_Meta_Description,
            pageMetaKeyword: req.body.Page_Meta_Keyword,
            pageHeading: req.body.Page_Heading,
            // pagePhoto: req.file.filename,
            pageDetails: req.body.Page_Details
        }})
        .then((x) =>{
            // req.flash('success',"Your data has been UPDATED !!")
            res.redirect('/admin/page/')
        })
    }
})

router.delete('/delete-page/:id',(req,res) =>{
    pageModel.deleteOne({pageUrl : req.params.id})
    .then((x) =>{
        res.redirect('/admin/page/')
    })
})

module.exports = router