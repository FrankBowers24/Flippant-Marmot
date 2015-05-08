var morgan = require('morgan');
var bodyParser = require('body-parser');
// var errorHandler = require('errorHandler');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var auth = require('../auth/authPassport');
// var helpers = require('./helpers.js');

module.exports = function(app, express){
  app.use(cookieParser('add a secret here'));
  app.use(session({ secret: 'xyz-qwrty', resave: false, saveUninitialized: true }));

  var userRouter = express.Router();
  var portfolioRouter = express.Router();
  var twitterRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.get('/', auth.signInIfNotAuthenticated);
  app.use('/index.html', auth.signInIfNotAuthenticated);
  app.use(express.static(path.join(__dirname,'/../../client')));

  app.use('/api/users', auth.authenticate, userRouter);
  app.use('/api/portfolio', auth.authenticate, portfolioRouter);
  app.use('/api/twitter', auth.authenticate, twitterRouter);
  // app.use(helpers.errorLogger);
  // app.use(helpers.errorHandler);


  app.use('/api/twitter', twitterRouter);

  // require('../users/userRoutes.js')(userRouter);
  require('../portfolio/portfolioRoutes.js')(portfolioRouter);

  // passport initialization
  auth.init(passport);
  app.use(passport.initialize());
  app.use(passport.session());
  // Passport Routes 
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/signin.html');
  });
  app.get('/auth/twitter', passport.authenticate('twitter', {forceLogin: true}));
  // app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter',
    { successRedirect: '/', failureRedirect: '/login' }
  ));
  app.get('/test', function(req, res){
    console.log('at /test, session: ', req.session);
    res.send('get /test OK');
  })
  require("../external/twitterRoutes.js")(twitterRouter);   //injects twitterRouter into twitterRoutes.js
}
