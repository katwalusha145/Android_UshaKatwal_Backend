const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth=require('../middleware/check-auth');
const Ratings = require('../models/ratings');
const Collections = require('../models/collections');


router.post('/getRatings',(req,res,next) => {
    Ratings.find()
    .populate('collectionid')
            .exec()
            .then(docs =>{
                res.status(200).json(docs);
            })
            .catch(err => {
                res.status(500).json({
                    error:err 
                });
            });
});

router.post('/rateCollection',(req,res,next) => {
    const ratings = new Ratings({
        _collectionid: req.body._collectionid,
        _userid:req.body._userid,
        _rating:req.body._rating,
        _date:new Date()
    });
    ratings.save().then(result => {
        Collections.updateOne({_id: req.body._collectionid}, {$inc: {_rateCount : 1, _rateValue : req.body._rating}})
        .exec()
        res.status(201).json({
            status:true
        });
    })
    .catch(err => {
        console.log(err);
         res.status(500).json({
             error: err
         });  
    });
});

router.post('/collectionRating', (req,res,next) => {
       const id = req.body.collectionid;
       Ratings.find({collectionid:id})
       .populate('collections')
       .exec()
       .then(doc => {
           if(doc) {
            res.status(200).json(doc);
           }else{
               res.status(404).json({
                   message: 'No users found'
               });
           }
           
       }).catch(err => {
           console.log(err);
           res.status(500).json({error:err});
       });
});


router.patch('/:collectionid/userid', checkAuth,(req,res,next) => {
    const id = req.params.collectionid;
    const updateOps = {};
    for (const key of Object.keys(req.body)) {
        updateOps[key]=req.body[key];
      }
    
    Ratings.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});


module.exports = router;