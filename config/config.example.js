/**
 * Created by mengdesen on 14-3-25.
 */
var configs = {
    development: {
        db: {
            mongoURI:'mongodb://localhost/woxiangqudb'
        },
        github: {
            clientID: '02878a2cbf6c4a2c05f9',
            clientSecret: '13b45281b890982ecbf9ee1c2fea3900dfe9f810',
            callbackURL: 'http://localhost:3000/auth/github/callback'
        },
        weibo: {
            clientID: "199676228",
            clientSecret: "afd83fb2635efe3968843d7f77271ab7",
            callbackURL: "http://127.0.0.1:3000/auth/weibo/callback"
        },
        port: 3000,
        sessionSecret: 'woxiangqu.com2014'
    },
    production: {
        db: {
            mongoURI:''
        },
        github: {
            clientID: '',
            clientSecret: '',
            callbackURL: ''
        },
        weibo: {
            clientID: "",
            clientSecret: "",
            callbackURL: ""
        },
        port: 2368,
        sessionSecret: ''
    }
};
module.exports = configs[process.env.NODE_ENV || 'development'];
