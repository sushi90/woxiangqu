/**
 * Created by Administrator on 14-3-20.
 */
var init = require('../lib/init');
var controller = require('../controllers/question');
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/')
}
module.exports = function(app){
    app.get('/question/create/:type',ensureAuthenticated, function(req, res){
        var type = req.params.type;
        var data = init.dataInit('添加题目',req.user,'menuNew');
        controller.create(type,data,function(err,data){
            data.testcase = (type != 'web' && type !='text');
            res.render('question/handle', data);
        });
    });
    app.post('/question/create', function(req, res){
        var question = req.body;
        question.author = req.user.name;
        controller.insert(req.body,function(err,Id){
            if(err){
                res.json(200,{error:true});
                return;
            }
            res.json(200,{error:false,qid:Id});
        });
    });
    app.post('/question/verify',function(req, res){
        var data = req.body;
        controller.verify(data.id,data.codes, req.user.name, req.user.avatar, function(err,results){
            if(err){
                res.json(200,{error: true});
                return;
            }
            res.json(200,results);
        })
    });
    app.get('/question/:qid', function(req, res){
        var data = init.dataInit('题目',req.user);
        controller.search(req.params.qid,data,function(err,data){
            data.question.codes = init.codes(data.question.language);
            data.submit = (data.question.language != 'web');
            if(req.user &&( data.question.author == req.user.name || req.user.permission =='admin')){
                data.edit = true;
            }
            if(req.session.passport !== {}){
                console.log(req.session);
                for(var i = 0; i < data.question.answer.length; i++){
                    if(data.question.answer[i].userId  === req.user.name){
                        data.hasAnwser = true;
                    }else{
                        data.hasAnwser = false;
                    }
                }
            }else{
                data.hasAnwser = false;
            }
            res.render('question/index',data);
        })
    });
    app.get('/question/update/:qid', function(req, res){
        var data = init.dataInit("更新题目", req.user, '');
        data.qid = req.params.qid;
        controller.search(data.qid,data,function(err,result){
            data.question = result.question;
            data.testcase = (result.question.language != 'web' && result.question.language !='text');
            data.question.tags = result.question.tags.join(';');
            data.update = true;
            data.question.preview = false;
            res.render('question/handle', data);
        })
    });
    app.get('/question/delete/:qid', function(req, res){
        controller.search(req.params.qid,{},function(err,data){
            if(data.question.author == req.user.name||req.user.permission =='admin'){
                controller.delete(req.params.qid,function(err){
                    if(err){
                        res.json(200,{error:true,message:''});
                        return;
                    }
                    res.redirect('/search');
                });
            }
            else{
                res.json(200,{error:true,message:'没有权限'});
            }
        })
    });
    app.post('/question/update', function(req, res){
        var question = req.body;
        controller.update(req.body,function(err,Id){
            if(err){
                res.json(200,{error:true});
                return;
            }
            res.json(200,{error:false,qid:Id});
        });
    });
    app.post('/question/thumbs', function(req, res){
        controller.thumbsup(req.body.questionId, req.body.userName, req.user.name, function(err, pointResult){
            if(err){
                res.json(200, {err:true});
                return;
            }
            res.json(pointResult);
        })
    })
};