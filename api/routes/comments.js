const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comments = require('../models/comments');
const checkAuth=require('../middleware/check-auth');

router.post('/addComment',(req,res,next) => {
    const comments = new Comments({
         _collectionid: req.body._collectionid,
         _userid:req.body._userid,
         _comment:req.body._comment,
         _date:new Date()     
    });
    comments.save().then(result => {
            res.status(201).json({
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

router.post('/getComments', (req,res,next) => {
    req.body.collectionid;
    const id = req.body.collectionid;
    Comments.find({_collectionid:id}).populate('_userid','_fullName')
    .sort({_id:-1})
    .exec()
    .then(doc => {
        if(doc) {
            res.status(200).json(doc);
        }else{
            res.status(404).json({
                status: false
            });
        }
    }).catch(err => {
        res.status(500).json({error:err});
    });
});

// router.patch('/:vehId', checkAuth,(req,res,next) => {
//     const id = req.params.vehId;
//     const updateOps = {};
//     for (const key of Object.keys(req.body)) {
//         updateOps[key]=req.body[key];
//       }
    
//     Comments.update({_id: id}, {$set: updateOps})
//     .exec()
//     .then(result => {
//         res.status(200).json(result);
//     })
//     .catch(err => {
//         res.status(500).json({
//             error: err
//         });
//     });
// });

router.delete('/deleteComment', checkAuth,(req,res,next) => {
    const cId = req.body._collectionid;
    const uId = req.body._userid;
    Comments.remove({_collectionid: cId,_userid: uId})
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