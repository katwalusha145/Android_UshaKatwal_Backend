const express = require('express');
const app = express();
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
require('./database/dbconnection');
const usersRouters=require('./api/routes/users');
const ratingsRouters=require('./api/routes/ratings');
const collectionRouters=require('./api/routes/collections');
const vehiclesRouters=require('./api/routes/comments');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/collection', collectionRouters);
app.use('/ratings', ratingsRouters);
app.use('/comments', vehiclesRouters);
app.use('/users', usersRouters);

app.use((req,res,next) => {
    const error = new Error('No results');
    error.status= 404;
    next(error);
});

app.use((error, req,res,next) => {
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            }
        });
});
module.exports = app;