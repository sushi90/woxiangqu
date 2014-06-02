/**
 * Created by mengdesen on 14-3-22.
 */
var mongoose = require('mongoose'),
    Company = mongoose.model('Company')
    , Question = mongoose.model('Question');

exports.all = function (data, callback) {
    var company = new Company();
    var question = new Question();
    company.getCompanyAndCount(function (err, docs) {
        if (err) {
            callback(err);
            return;
        }
        data.companys = docs;
        question.findTenQuestionByDate(1, function (err, docs) {
            if (err) {
                callback(err);
                return;
            }
            data.questions = docs;
            callback(null, data);
        })
    })
};

exports.search = function (data, callback) {
    var company = new Company();
    var question = new Question();
    company.getCompanyAndCount(function (err, docs) {
        if (err) {
            callback(err);
            return;
        }
        data.companys = docs;
        question.findPagination(data.companyName, data.pageNum,data.language, 10, function (err, pageCount, docs) {
            if (err) {
                callback(err);
                return;
            }
            data.pageCount = pageCount;
            data.questions = docs;
            callback(null,data);
        });
    })
};
