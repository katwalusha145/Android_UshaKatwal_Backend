const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const comments = mongoose.Schema({
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
      _comment: {
        type: String,
        required:true
      },
      _date:Date
});

module.exports = mongoose.model('comment', comments);

