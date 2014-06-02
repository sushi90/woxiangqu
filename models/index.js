/**
 * Created by Administrator on 14-3-20.
 */
/**
 * load all of models
 */
module.exports = function(db, Schema){
    return {
        user: require('./user')(db, Schema),
        company: require('./company.js')(db, Schema),
        question: require('./question.js')(db, Schema)
    }
}