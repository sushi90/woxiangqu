/**
 * Created by mengdesen on 14-3-21.
 */
var init = require('../lib/init');
var controllers = require('../controllers/search');
module.exports = function (app) {
    app.get('/search/:name', function (req, res) {
        var data = init.dataInit(req.params.name, req.user, 'menuSearch');
        data.companyName = req.params.name;
        if(data.companyName == '所有公司'){
            data.companyName = '';
        }
        data.pageNum = req.query.page || 1;
        data.language = req.query.lang||'';
        data.pathName = req._parsedUrl.pathname;
        data.pageURL = data.pathName;
        if(data.language){
            data.pageURL += '?lang='+data.language+ '&page=';
            data[data.language] = 'active';
        }
        else{
            data.pageURL +=  '?&page=';
            data.all = 'active';
        }
        controllers.search(data,function(err,data){
            res.render('search',data);
        });
    });
    app.get('/search', function (req, res) {
        var data = init.dataInit('', req.user, 'menuSearch');
        data.title = '所有公司';
        data.pageNum = req.query.page || 1;
        data.language = req.query.lang||'';
        data.companyName = '';
        data.pathName = req._parsedUrl.pathname;
        data.pageURL = data.pathName;
        if(data.language){
            data.pageURL += '?lang='+data.language+ '&page=';
            data[data.language] = 'active';
        }
        else{
            data.pageURL +=  '?&page=';
            data.all = 'active';
        }
        controllers.search(data,function(err,data){
            res.render('search',data);
        });
    });
};