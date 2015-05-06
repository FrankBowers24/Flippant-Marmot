var mongoose = require('mongoose');
require('../users/userModel.js');
var User = mongoose.model('User');
var TwitterStrategy = require('passport-twitter').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;

// API keys configuration file
var config = require('./AuthConfig');

module.exports = function (passport) {

  // Serialize the user for storing it in the session
  passport.serializeUser(function (user, done) {
  	// console.log('serializeUser ', user);
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
  	// console.log('deserializeUser ', obj);
    done(null, obj);
  });

  passport.use(new TwitterStrategy({
    consumerKey: config.twitter.key,
    consumerSecret: config.twitter.secret,
    callbackURL: '/auth/twitter/callback'
  }, function (accessToken, refreshToken, profile, done) {
    User.findOne({
      provider_id: profile.id
    }, function (err, user) {
    	// console.log('ERROR in finding user on login: ', err);
      if (err) throw (err);
      // console.log('LOGIN no error, user: ', user);
      if (!err && user != null) return done(null, user);

      var user = new User({
        provider_id: profile.id,
        provider: profile.provider,
        name: profile.displayName,
        screen_name: profile.username,
        photo: profile.photos[0].value
      });
      user.save(function (err) {
        console.log('ERROR in user creation on login: ', err);
        if (err) throw err;
        done(null, user);
      });
    });
  }));

};