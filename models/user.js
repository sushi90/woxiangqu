/**
 * User Schema
 */
module.exports = function(db, Schema){
    var userSchema = new Schema({
        id: String,
        name: String,
        avatar: String,
        provider: String,
        token: String,
        permission: {type: String, default: 'customer'}
    });
    return db.model('User', userSchema);
};

