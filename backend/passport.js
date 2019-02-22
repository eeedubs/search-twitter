'use strict';

require('./mongoose')();
require('dotenv').config();

const passport = require('passport');
const TwitterTokenStrategy = require('passport-twitter-token');
const User = require('mongoose').model('User');
const GoogleTokenStrategy = require('passport-google-token').Strategy;

  module.exports = function() {

    passport.use(new TwitterTokenStrategy({
      consumerKey: process.env.twitterConsumerKey,
      consumerSecret: process.env.twitterConsumerSecret,
      includeEmail: true
    },
    function (token, tokenSecret, profile, done) {
      User.upsertTwitterUser(token, tokenSecret, profile, function(err, user){
        return done(err, user);
      });
    }));

    passport.use(new GoogleTokenStrategy({
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleClientSecret
    },
    function (token, tokenSecret, profile, done) {
      User.upsertGoogleUser(token, tokenSecret, profile, function(err, user){
        return done(err, user);
      });
    }))
  };