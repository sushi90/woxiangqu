var mongoose = require('mongoose'),
    GitHubStrategy = require('passport-github').Strategy,
    WeiboStrategy = require('passport-weibonew').Strategy,
    RememberMeStrategy = require('passport-remember-me').Strategy,
    User = mongoose.model('User'),
    auth = require('../lib/auth'),
    config = require('./config'),
    gravatar = require('gravatar');

module.exports = function (passport) {
// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
    passport.use(new GitHubStrategy({
            clientID: config.github.clientID,
            clientSecret: config.github.clientSecret,
            callbackURL: config.github.callbackURL
        },
        function (accessToken, refreshToken, profile, done) {
            User.findOne({ 'id': profile.id }, function (err, user) {
                if (!user) {
                    user = new User({
                        id: profile.id,
                        name: profile.username,
                        avatar: gravatar.url(profile.emails[0].value),
                        provider: 'github',
                        token: auth.md5(profile.displayName+(new Date()).getTime())
                    });
                    user.save(function (err) {
                        return done(err, user)
                    })
                } else {
                    User.findOneAndUpdate({ 'id': profile.id }, {
                        id: profile.id,
                        name: profile.username,
                        avatar: gravatar.url(profile.emails[0].value),
                        provider: 'github',
                        token: auth.md5(profile.displayName+(new Date()).getTime())
                    },function(err, user){
                        if(err){
                            done(err);
                            return;
                        }
                        return done(err, user);
                    })
                }
            })
        }
    ));

    passport.use(new WeiboStrategy({
            clientID: config.weibo.clientID,
            clientSecret: config.weibo.clientSecret,
            callbackURL: config.weibo.callbackURL
        },
        function (accessToken, refreshToken, profile, done) {
            User.findOne({ 'id': profile.id }, function (err, user) {
                if (!user) {
                    console.log(profile);
                    user = new User({
                        id: profile.idstr,
                        name: profile.screen_name,
                        avatar: profile.avatar_hd,
                        provider: 'weibo',
                        token: auth.md5(profile.screen_name+(new Date()).getTime())
                    });
                    user.save(function (err) {
                        return done(err, user)
                    })
                } else {
                    User.findOneAndUpdate({ 'id': profile.id }, {
                        id: profile.idstr,
                        name: profile.screen_name,
                        avatar: profile.avatar_hd,
                        provider: 'weibo',
                        token: auth.md5(profile.screen_name+(new Date()).getTime())
                    },function(err, user){
                        if(err){
                            done(err);
                            return;
                        }
                        return done(err, user);
                    })
                }
            })
        }
    ));
    passport.use(new RememberMeStrategy(
        function(token, done) {
            User.findOne({token:token},function(err,user){
                return done(err,user);
            });
        },
        function(user,done){
//            var user = new User(user);
//            user.token = auth.md5(user.username+(new Date()).getTime());
//            user.save(function(err){
//
//            })
            return done(null, user.token);
        }
    ));
};