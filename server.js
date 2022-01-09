var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config/database');
var bodyParser = require('body-parser');
var passport = require('passport');
const cors = require('cors')  // allows/disallows cross-site communication
var expressValidator = require('express-validator');


// Connect to db
mongoose.connect(config.MONGODB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Init app
var app = express();

// Express Validator middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
                , root = namespace.shift()
                , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
    
}));


// config cors 
const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://ecommrce-shopping-cart.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

// Body Parser middleware  

/*
body-parser extracts the entire body of the incoming request and puts it in req.body.

A new body object containing the parsed data is populated on the request object
after the middleware (i.e. req.body).
This object will contain key-value pairs,
where the value can be a string or array
(when extended is false), or any type (when extended is true).
*/
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json 

/*
bodyParser. json() Returns middleware that only parses json and only
looks at requests where the Content-Type header matches the type option
*/
app.use(bodyParser.json());


// Express Session middleware

/*
// secret: 
 A session secret is simply used to compute the hash.
Without the string, access to the session would essentially be "denied".
It is very important that this value be unique.

// resave: it updated in the session store (will be active), 
even the session wasn't changed during a request.

//saveUninitialized - if it is true it means: 
session object will always be stored in the session store.
Then, You'd be able to recognize such a visitor because they
send the session cookie containing the unique id.
*/


// Passport Config
require('./config/passport')(passport);

// Passport Middleware
app.use(passport.initialize());


// Set routes 
var homePage = require('./routes/homePage.js');
var products = require('./routes/products.js');
var users = require('./routes/users.js');

app.use('/products', products);
app.use('/users', users);
app.use('/', homePage);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'fronted/build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'fronted/build', 'index.html'));
    });
  }

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, function () {
    
    console.log('Server started on port ' + port);
});
