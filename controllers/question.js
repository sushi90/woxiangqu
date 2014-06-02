/**
 * Created by Administrator on 14-3-21.
 */
var mongoose = require('mongoose'),
    Question = mongoose.model('Question'),
    testjs = require('wxq-js'),
    testhtml = require('wxq-html'),
    testcss = require('wxq-css'),
    init = require('../lib/init');

exports.search = function (qid, data, callback) {
    var question = new Question();
    question.findQuestionById(qid, function (err, ques) {
        data.question = ques;
        callback(err, data);
    })
};

exports.create = function (type, data, callback) {
    data.question = {};
    data.question.codes = init.testcases(type);
    callback(null, data);
};

exports.insert = function (data, callback) {
    var question = new Question();
    data.codes = data.testcase;
    if (data.language == 'javascript') {
        var code = data.testcase[0].code;
        data.testcase[0].code = code.replace(/[\r\n]/g,"")
        var testcases = code.split(';');
        var tmpTestCase = new Array();
        for (var i = 0; i < testcases.length; i++) {
            if (!(testcases[i] == '')) {
                tmpTestCase.push(testcases[i] + ';');
            }
        }
        data.testcase = tmpTestCase;
        data.codes[0].code = code;
    }
    question.addQuestion(data, function (err, Id) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, Id);
    })
};

exports.verify = function (qid, codes, userId, avatar, callback) {
//    console.log(JSON.stringify(codes));
    Question.findOne({_id: qid}, function (err, docs) {
        if (err || docs.testcase == null) callback(err);
        var testcases = docs.testcase;
        var resultArray = new Array();
        if (docs.language == 'javascript') {
            for (var i = 0; i < testcases.length; i++) {
                testjs.calls(codes[0].code, testcases[i], function (err, result) {
                    if (err) {
                        resultArray.push({pass: false, info: result});
                        callback(null, resultArray);
                        return;
                    }
                    if (result == 'passed') {
                        resultArray.push({pass: true, info: '恭喜您!测试通过!'});
                        Question.insertComment(qid, codes[0].code, userId, avatar, function(err){
                            if(err){
                                console.log(err);
                                return;
                            }
                            callback(null, resultArray);
                        });
                    } else {
                        resultArray.push({pass: false, info: result});
                    }
                });
            }
        }
    })
};

exports.update = function (data, callback) {
    var question = new Question;
    data.codes = data.testcase;
    if (data.language == 'javascript') {
        var code = data.testcase[0].code;
        data.testcase[0].code = code.replace(/[\r\n]/g,"")
        var testcases = code.split(';');
        var tmpTestCase = new Array();
        for (var i = 0; i < testcases.length; i++) {
            if (!(testcases[i] == '')) {
                tmpTestCase.push(testcases[i] + ';');
            }
        }
        data.testcase = tmpTestCase;
        data.codes[0].code = code;
    }
    question.updateQuestion(data, function (err, docs) {
        if (err) {
            callback(err);
        }
        callback(null, data.id);
    });
};

exports.delete = function (id, callback) {
    var question = new Question;
    question.deleteQuestion(id, function(err){
        if(err){
            callback(err);
            return;
        }
        callback(null, true);
    });
};

exports.thumbsup = function(questionId, userName, pointUser, callback){
    Question.setPointByQuestionIdAndUserName(questionId, userName, pointUser, function(err, result){
        if(err){
            callback(err);
            return;
        }
        callback(null, result);
    })
}