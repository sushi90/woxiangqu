/**
 * Created by mengdesen on 14-3-22.
 */
var mongoose = require('mongoose'),
    Company = mongoose.model('Company');
module.exports = function(data,callback){
    var company = new Company();
    company.getSixCompany(function(err, c){
        if(err)console.log(err);
        data.companys = c;
        callback(null,data);
    })
};
