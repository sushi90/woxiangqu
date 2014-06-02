/**
 * Created by mengdesen on 14-3-21.
 */
var init = require('../lib/init');
var controller = require('../controllers/index');
module.exports = function(app,passport){
    app.get('/', function(req, res){
        var data = init.dataInit('首页',req.user,'menuIndex');
        controller(data,function(err,indexData){
            res.render('index', indexData);
        });
    });
    app.get('/abuout',function(req, res){
        var data = init.dataInit('关于我们',req.user,'');
        controller(data,function(err,indexData){
            res.render('about', indexData);
        });
    });
    app.get('/help',function(req, res){
        var data = init.dataInit('使用帮助',req.user,'');
        controller(data,function(err,indexData){
            res.render('help', indexData);
        });
    });
    require('./question')(app);
    require('./search')(app);
    require('./user')(app,passport);
};