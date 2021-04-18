const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Collections = require('../models/collections');
// const checkAuth=require('../middleware/check-auth');

router.post('/getCollections', (req,res,next) => {
    Collections.aggregate(
        [
          { $project: { _rateValue:1,_rateCount:1, _genre:1,_actors:1,
            _type:1,_image:1,_directors:1,
            _collectionName:1,_description:1,_releaseDate:8} },
          { '$addFields': { '_rating': { '$divide': ['$_rateValue', '$_rateCount'] } } }
        ]
     )
            .exec()
            .then(docs =>{
                console.log(docs);
                res.status(200).json(docs);
            })
            .catch(err => {
                res.status(500).json({
                    error:err 
                });
            });
});

router.post('/addCollection' ,(req,res,next) => {
    const collections = new Collections({
         _collectionName: req.body._collectionName,
         _releaseDate:req.body._releaseDate,
         _description:req.body._description,
         _directors:req.body._directors,
         _actors:req.body._actors,
         _image:req.body._image,
         _type:req.body._type,
         _genre:req.body._genre,
         _rateCount:0,
         _rateValue:0
    });

    collections.save().then(result => {
            res.status(200).json({
                status:true,
        });
    })
    .catch(err => {
        console.log(err);
         res.status(500).json({
             error: err
         });  
    });
});
const ObjectId = mongoose.Types.ObjectId;

router.post('/getcollection',(req,res,next) => {
       req.body.collectionid;
       const id = req.body.collectionid;
       Collections.aggregate(
        [
            {$match: { _id: ObjectId(id)}},
          { $project: { _rateValue:1,_rateCount:1, _genre:1,_actors:1,
            _type:1,_image:1,_directors:1,
            _collectionName:1,_description:1,_releaseDate:8} },
          { '$addFields': { '_rating': { '$divide': ['$_rateValue', '$_rateCount'] } } }
        ]
     )
       .exec()
       .then(doc => {
           if(doc) {
            res.status(200).json(doc);
           }else{
               res.status(404).json({
                   message: 'No collections found'
               });
           }
       }).catch(err => {
           res.status(500).json({error:err});
       });
});

router.patch('/:collectionid',(req,res,next) => {
    const id = req.params.collectionid;
    const updateOps = {};
    for (const key of Object.keys(req.body)) {
        updateOps[key]=req.body[key];
      }
    Collections.update({_id: id}, {$set: updateOps})
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

router.delete('/:collectionid',(req,res,next) => {
    const id = req.params.collectionid;
    Collections.remove({_id: id})
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