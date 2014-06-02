/**
 * Created by Administrator on 14-3-18.
 */
module.exports = function (db, Schema) {
    var questionSchema = new Schema({
        title: {type: String, default: ''},
        intro: { type: String, default: ''},
        codes: [
            {tab: {type: String}, active: {type: Boolean}, code: {type: String}}
        ],
        testcase: [],
        preview: {type: Boolean},
        company: { type: String, default: ''},
        answer: [{content: {type: String}, point: {type: Number}, userId: {type: String}, avatar: {type: String}, pointUser: [{userId: {type: String}}]}],
        language: {type: String, default: ''},
        tags: [],
        date: {type: Date, default: Date.now},
        author: {type: String, default: "佚名"}
    });

    questionSchema.statics = {
        getAnswerByQuestionId: function(questionId, callback){
            this.find({_id: questionId}, function(err,doc){
                if(err){
                    callback(err);
                    return;
                }
                callback(null, doc.answer);
                return;
            })
        },
        setPointByQuestionIdAndUserName: function(questionId, userName, pointUser, callback){
            this.findOne({_id: questionId}, function(err, doc){
                var pointReuslt = 0;
                var flagPoint = true;
                if(err){
                    callback(err)
                    return;
                }
                for(var i = 0;i < doc.answer.length; i++){
                    if(doc.answer[i].userId === userName){
                        if(doc.answer[i].pointUser.length == 0){
                            doc.answer[i].pointUser.push({userId: pointUser});
                            pointReuslt = doc.answer[i].point += 1;
                            flagPoint = false;
                        }else{
                            for(var j = 0; j < doc.answer[i].pointUser.length; j++){
                                if(doc.answer[i].pointUser[j].userId === pointUser){
                                    doc.answer[i].pointUser.splice(j,1);
                                    pointReuslt = doc.answer[i].point -= 1;
                                    flagPoint = false;
                                }
                            }
                            if(pointReuslt === true){
                                doc.answer[i].pointUser.push({userId: pointUser});
                                pointReuslt = doc.answer[i].point += 1;
                            }
                        }
                        doc.save(function(err){
                            if(err){
                                callback(err);
                                return;
                            }
                            callback(null, pointReuslt);
                            return;
                        })
                    }
                }
            })
        },
        insertComment: function(questionId, content, userId, avatar, callback){
            this.findOne({_id: questionId}, function(err, doc){
                var flagPointUser = true;
                if(err){
                    callback(err);
                    return;
                }
                if(doc.answer.length === 0){
                    doc.answer.push({content: content, point: 0, userId: userId, avatar: avatar});
                    flagPointUser = false;
                }else{
                    for(var i = 0, j = doc.answer.length; i < j; i++){
                        console.log(doc.answer.length)
                        if(doc.answer[i].userId === userId){
                            doc.answer.splice(i, 1);
//                            doc.answer[i] = {content: content, point: 0, userId: userId, avatar: avatar};
                            doc.answer.push({content: content, point: 0, userId: userId, avatar: avatar});
                            flagPointUser = false;
                        }
                    }
                    if(flagPointUser === true){
                        doc.answer.push({content: content, point: 0, userId: userId, avatar: avatar});
                    }
                }
                console.log(JSON.stringify(doc.save))
                doc.save(function(err){
                    if(err){
                        callback(err);
                        return;
                    }
                    callback(null);
                    return;
                })
            })
        }
    }

    questionSchema.methods = {
        addQuestion: function (question, callback) {
            var questionModel = this.model('Question');
            var questionEntity = new questionModel(question);
            questionEntity.save(function (err, doc) {
                if (err) {
                    callback(err);
                    return;
                }
                var companyModel = db.model('Company');
                var company = new companyModel();
                company.addCount({name: doc.company});
                company.addCount({name: '所有公司'});
                callback(null, doc._id);
            })
        },
        updateQuestion: function(question, callback){
            var questionModel = this.model('Question');
            /**
             * when company different,move question count to another company
             */
            questionModel.findOne({_id: question.id}, function (err, doc) {
                if (err) {
                    console.log(err)
                }
                if(question.company != doc.company){
                    var companyModel = db.model('Company');
                    var company = new companyModel();
                    company.addCount({name: question.company});
                    company.reduceCount({name: doc.company});
                }
            })

            questionModel.findByIdAndUpdate(question.id,{$set:question},function(err,result){
                if(err){
                    callback(err);
                    return;
                }
                callback(null,result);
            });
        },
        deleteQuestion: function(id, callback){
            var questionModel = this.model('Question');
            questionModel.findOne({_id: id}, function (err, doc) {
                if (err) {
                    console.log(err)
                }
                var companyModel = db.model('Company');
                var company = new companyModel();
                company.reduceCount({name: doc.company});
                company.reduceCount({name: '所有公司'});
                questionModel.remove({_id: id}, function(err){
                    if(err){
                        callback(err);
                        return;
                    }
                    callback(null);
                    return;
                })
            })
        },
        //company is obj
        findQuestionByCompany: function (company, callback) {
            var questionModel = this.model('Question');
            questionModel.find({company: company}).sort('-date').exec(function (err, docs) {
                if (err) {
                    callback(err);
                }
                callback(null, docs);
            })
        },
        findQuestionById: function (id, done) {
            var questionModel = this.model('Question');
            questionModel.findOne({_id: id}, function (err, docs) {
                if (err) {
                    console.log(err)
                }
                done(err, docs);
            })
        },
        findQuestionByCompanyWithParam: function (company, language, done) {
            var questionModel = this.model('Question');
            questionModel.find(company)
                .where('language').equal(language)
                .exec(function (err, question) {
                    if (err) console.log(err);
                    done(err, question);
                })
        },
        findTenQuestionByDate: function (pageNum, callback) {
            var question = this.model('Question');
            var questionNum = pageNum * 10;
            question.find({}).limit(10).sort('-date').exec(function (err, docs) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, docs)
            })
        },
        findPagination: function (company, pageNum,language, limit, callback) {
            var questionModel = this.model('Question');
            var skipFrom = (pageNum * limit) - limit;
            var query = {};
            if(company){
                query.company = company;
            }
            if(language){
                query.language = language;
            }
            questionModel.find(query).sort('-date').skip(skipFrom).limit(limit)
            .exec(function (err, docs) {
                if (err) {
                    callback(err, null, null);
                    return;
                }
                questionModel.count(query, function (err, count) {
                    if (err) {
                        callback(err, null, null);
                        return;
                    }
                    var pageCount = Math.ceil(count / limit);
                    callback(null, pageCount, docs);
                });
            });
        }
    };
    return db.model('Question', questionSchema);
};

