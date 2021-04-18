const mongoose = require('mongoose');
const collection = mongoose.Schema({
    _collectionName:String,
    _releaseDate:{
        type:Date
    },
    _description:{
        type:String,
        default:""
    },
    _directors:{
        type:String,
        default:""
    },
    _actors:{
        type:String,
        default:""
    },
    _type:Number,
    _image:{
        type:String,
        default:""
    },
    _genre:{
        type:String,
        default:""
    },
    _rateCount:Number,
    _rateValue:Number
});

module.exports = mongoose.model('collection', collection);

