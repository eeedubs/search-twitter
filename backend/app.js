require('dotenv').config();

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const Twitter = require('twitter');

const index = require('./routes/index');

const app = express();

const client = new Twitter({
  consumer_key: process.env.twitterConsumerKey,
  consumer_secret: process.env.twitterConsumerSecret,
  access_token: process.env.twitterAccessTokenKey,
  access_token_secret: process.env.twitterAccessTokenSecret,
  bearer_token: process.env.twitterBearerToken
});

const corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', index);

app.get("/tweets", function(req, res) {
  let query = req.query.search;
  client.get('search/tweets', {q: `#${query}`, count: 20 }, function (error, tweets, response) {
    res.json(tweets);
    // tweets.forEach((tweet) => {
      // console.log(tweet);
    // });
  });
})

module.exports = app;