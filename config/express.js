'use strict';

/**
 * Module dependencies.
 */
var express = require('express')
    , hbs = require('express-hbs')
    , mongoStore = require('connect-mongo')(express)
    , mongoose = require('mongoose')
    , config = require('./config')
    , domain = require('domain')
    , logger = require('../lib/logger');
//init hbsHelpers
require('../lib/hbsHelpers')(hbs);
module.exports = function(app, passport) {
    // configure Express
    app.configure(function() {
        app.engine('hbs', hbs.express3({
            partialsDir: __dirname + '/../views/partials',
            layoutsDir: __dirname + '/../views/layouts'
        }));
        app.set('view engine', 'hbs');
        app.set('views', __dirname + '/../views');

        /**
         * try and catch error
         */
        app.use(function(req, res, next){
            var reqDomain = domain.create();
            reqDomain.on('error', function(){
                try{
                    var killTimer = setTimeout(function(){
                        process.exit(1);
                    }, 30000);
                    killTimer.unref();
                    res.send(500);
                }
                catch(e){
                    console.log('error when exit');
                }
            });
            reqDomain.run(next);
        });

//        process.on('uncaughtException', function (err) {
//            logger.setLevel('ERROR');
//            try {
//                var killTimer = setTimeout(function () {
//                    process.exit(1);
//                }, 30000);
//                killTimer.unref();
//                logger.error('Server maybe crash.Thanks for lxy catch it.The error: ' + err);
//            } catch (e) {
//                logger.error('Server is crashed.Sorry! The error: ' + err + ' The stack: ' + e.stack);
//            }
//        });

        app.use(express.logger('dev'));
        app.use(express.compress());
        app.use(express.cookieParser());
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.session({
            secret: config.sessionSecret,
            store: new mongoStore({db: mongoose.connections[0].db })
        }));
        // Initialize Passport!  Also use passport.session() middleware, to support
        // persistent login sessions (recommended).
        app.use(passport.initialize());
        app.use(passport.authenticate('remember-me'));
        app.use(app.router);
        app.use(express.static(__dirname + '/../public'));
    });
};
