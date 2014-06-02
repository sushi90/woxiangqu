/**
 * Created by Administrator on 14-3-27.
 */
var log4js = require('log4js');

log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file',
          filename: 'logs/log.txt',
          pattern: '__yyyy-MM-dd',
          alwaysIncludePattern: 'false',
          backups: 4,
          category: 'server'}
    ],
    replaceConsole: true
});

module.exports = log4js.getLogger('server');