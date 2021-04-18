const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Register = require('../models/register');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register',(req,res,next) => {
    bcrypt.genSalt(12, function(err, salt) {
        bcrypt.hash(req.body._userPassword, salt, function(err, hash) {
        const register = new Register({
        _userEmail: req.body._userEmail,
        _userPassword:hash,
        _fullName:req.body._fullName
    });
    register.save().then(result => {
            var data=result.toJSON();
           delete data._userPassword;
            res.status(201).json({
                status:true
               // createdUser: data
        });
    })
    .catch(err => {
        console.log(err);
         res.status(500).json({
             error: err
         });  
    });
});
});
});

router.post('/checkuser', (req,res,next) => {
       var email = req.body._userEmail;
       Register.find({_userEmail:email}).exec()
       .then(doc => {
           if(doc.length>0) {
            res.status(200).json({
                message: 'exists'
            });
           }else{
               res.status(200).json({
                   message: 'No users found'
               });
           }
       }).catch(err => {
           console.log(err);
           res.status(500).json({error:err});
       });
});


router.patch('logout/:userid', (req,res,next) => {
    var id =  req.params.userid;
    Register.updateOne({_id:id},{$set:{_token:''}})
    .exec().then(doc => {
        if(doc) {
            res.send({
                message: 'success'
            });
        }else{
         res.send({
             message: 'error'
         });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});

router.post('/login', (req,res,next) => {
    Register.findOne({_userEmail: req.body.email}).exec()
    .then(doc => {
        if(doc) {
        
         bcrypt.compare(req.body.password, doc._userPassword, function(err, ress) {
             if(ress){
                 var result = doc.toJSON();
                 delete result._userPassword;
                 var token = jwt.sign({ email: result._userEmail,id:result._id}, 'secretkey');
                 result.token=token;
                 result.status=true;
                 result.message="success";
                 Register.updateOne({_userEmail:req.params.email},{$set:{_token:token}})
                .exec()
                // console.log(result);
                 return res.send(result);
             }
             else {
                 res.send({
                     message: 'error'
                 });
             }
          });
        }else{
         res.send({
             message: 'nouser'
         });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});


router.delete('/:userid', (req,res,next) => {
    const id = req.params.userid;
    Register.deleteOne({_id: id})
        .exec()
        .then(result => {
                res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
module.exports = router;