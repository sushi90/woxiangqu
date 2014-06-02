/**
 * Created by mengdesen on 14-3-22.
 */
var crypto = require('crypto');

exports.md5 = function (str) {
    return crypto.createHash('md5').update(str).digest('hex');
};

