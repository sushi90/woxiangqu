/**
 * Created by Administrator on 14-3-22.
 */
module.exports = function (db, Schema) {
    var companySchema = new Schema({
        name: String,
        questionCount: Number,
        intro: String
    });

    companySchema.method({
        addCompany: function (company, callback) {
            var companyModel = this.model('Company');
            companyModel.findOne(company, function (err, data) {
                if (!data) {
                    var companyEntity = new companyModel({name: company.name, questionCount: 0});
                    companyEntity.save(function (err, doc) {
                        if (err)callback(err);
                        else callback(null, doc);
                    })
                } else {
                    console.log('exist this company!');
                }
            })
        },
        addCount: function (company) {
            var companyModel = this.model('Company');
            companyModel.findOne(company, function (err, docs) {
                if (!docs) {
                    var companyEntity = new companyModel();
                    companyEntity.addCompany(company,function(err, doc){
                        if(err)return;
                        docs = doc;
                        companyModel.findOneAndUpdate(company, {questionCount: docs.questionCount + 1}, function (err) {
                            if (err)console.log('err:' + err);
                            else console.log('questioncount++ success!');
                        });
                    });
                }else{
                    companyModel.findOneAndUpdate(company, {questionCount: docs.questionCount + 1}, function (err) {
                        if (err)console.log('err:' + err);
                        else console.log('questioncount++ success!');
                    });
                }
            })
        },
        reduceCount: function (company) {
            var companyModel = this.model('Company');
            companyModel.findOne(company, function (err, docs) {
                if (!docs) {
                    var companyEntity = new companyModel();
                    companyEntity.addCompany(company,function(err, doc){
                        if(err)return;
                        docs = doc;
                        companyModel.findOneAndUpdate(company, {questionCount: docs.questionCount - 1}, function (err) {
                            if (err)console.log('err:' + err);
                            else console.log('questioncount-- success!');
                        });
                    });
                }else{
                    companyModel.findOneAndUpdate(company, {questionCount: docs.questionCount - 1}, function (err) {
                        if (err)console.log('err:' + err);
                        else console.log('questioncount-- success!');
                    });
                }
            })
        },
        /**
         * get all companies and their count
         * @param done
         */
        getCompanyAndCount: function (done) {
            var companyModel = this.model('Company');
            companyModel.find({questionCount: {'$ne':0}}).sort('-questionCount').exec(function (err, docs) {
                if (err){
                    done(err)
                }
                console.log(JSON.stringify(docs));
                done(err, docs);
            })
        },
        getCountByCompanies: function (names, callback) {
            var companyModel = this.model('Company');
            var counts = new Array();
            for(var name in names){
                companyModel.findOne({name: name}, function (err, docs) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    count[docs.name] = docs.count;
                })
            }
            callback(null, counts);
        },
        getSixCompany: function(callback){
            var companyModel = this.model('Company');
            companyModel.find({}).limit(6).sort('-questionCount').exec(function(err, docs){
                if(err){
                    callback(err);
                    return;
                }
                callback(null, docs);
            });
        }
    });
    return db.model('Company', companySchema);
};