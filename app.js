var express = require('express')
  , passport = require('passport')
  , mongoose = require('mongoose')
  , config = require('./config/config')
  , fs = require('fs');

var app = express();
//config the log
fs.exists('./logs', function(exist){
    if(!exist){
        fs.mkdir('./logs', function(err){
            if(err){
                console.log('create file faile');
            }else{
                console.log('created file!')
            }
        })
    }
});

//init mongoDB
mongoose.connect(config.db.mongoURI);
mongoose.connection.on('error', function (err) {
    console.log(err)
});
mongoose.connection.on('disconnected', function () {
    mongoose.connect(config.db.mongoURI)
});
//init models
require('./models')(mongoose, mongoose.Schema);

// init config
require('./config/express')(app,passport);
require('./config/passport')(passport);
// init routes
require('./routes')(app,passport);
app.listen(config.port);
