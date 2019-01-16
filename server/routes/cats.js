var express = require('express');
var router = express.Router();
var Cat = require('../models/cat');

router.get('/', helloWorld);
router.get('/cats', likeNameCat);
router.get('/cats', findAllCats);
router.get('/cat/:id', findCatById);

router.post('/cats', addCat);
router.put('/cat/:id', updateCat);
router.delete('/cat/:id', deleteCat);

function helloWorld(req, res){
    res.status(200).send("It's working..");
}
function findAllCats(req, res){
    Cat.find((err,cats)=>{
        if(err)
            res.status(500).json({message: "Error during find all"})
        else
            res.status(200).json(cats);
    })
}
function addCat(req, res){
    var newCat = new Cat({ name: req.body.name });

    newCat.save((err, cat)=>{
        if(err)
            res.status(500).json({message: "Error during save"})
        else 
            res.status(200).json(cat);
    })
}
function likeNameCat(req, res, next){
    if(!req.query.name) return next('route');
    
    var regex = new RegExp('.*' + req.query.name + '.*', 'i');

    Cat.find({ name : regex}).exec((err, docs)=>{
        if(err)
            res.status(500).json({message: "Error during finding"})
        else
            res.status(200).json(docs)
    });
}
function findCatById(req, res){
    Cat.findById(req.params.id).exec((err, cat)=>{
        if(err)
            res.status(500).json({message: "Error during query by id"})
        else
            res.status(200).json(cat);
    })
}
function updateCat(req, res){
    Cat.findById(req.params.id, (err, cat)=>{
        if(err)
            res.status(500).json({message: "Error during getting record"})
        else{
            cat.name = req.body.name;

            cat.save((err)=>{
                if(err)
                    res.status(400).json({message:"Error during updating"});
                else
                    res.status(200).json(cat);
            })
        }
    })
}
function deleteCat(req,res){
    Cat.findById(req.params.id).exec((err, cat)=>{
        if(err)
            res.status(500).json({message:"Error during getting record"})
        else
            cat.remove((err,cat)=>{
                if(err)
                    res.status(500).json({message: "Error during deleting"});
                else
                    res.status(200).json(cat);
            })
    })
}
module.exports = router;