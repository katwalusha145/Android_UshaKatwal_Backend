const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/omdb',
{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
