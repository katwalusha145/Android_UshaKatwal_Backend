const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const rating = mongoose.Schema({
  _collectionid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "collection",
        required:true
      },
      _userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
      },
      _rating: {
        type: Number,
        required:true
      },
      _date:Date
});

module.exports = mongoose.model('rating', rating);

