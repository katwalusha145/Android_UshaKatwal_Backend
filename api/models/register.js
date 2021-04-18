const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = mongoose.Schema({
    _userEmail:{type:String,trim:true,required:true},
    _userPassword:{type:String,required:true},
    _userPhone:String,
    _fullName:{type:String,required:true},
    _userImage:{type:String,default:""},
    _token:{
        type:String,
        default:""
    }
  
});

module.exports = mongoose.model('user', user);
