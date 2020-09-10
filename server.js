


var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var confgDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(confgDB.url); // connect to db

require('./config/passport')(passport); // pass passport for confg

app.configure(function() {

	//  express application
	app.use(express.logger('dev')); // log all req to console
	app.use(express.cookieParser()); // read cookies
	app.use(express.bodyParser()); // get html forms

	app.set('view engine', 'ejs'); // ejS

	// required for passport
	app.use(express.session({ secret: 'arodumPrayarutheNeedtorandomise' })); // sess secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

});

// routes
require('./app/routes.js')(app, passport); // load routes n pass app and configured passport

// launch
app.listen(port);
console.log('Nodejs on port ' + port);
