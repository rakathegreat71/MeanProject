// /importing depedencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
var mongoose = require('mongoose');
var config = require('./config/database')



//database setup
mongoose.Promise = global.Promise;
mongoose.connect(config.database,{ useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("yes we are connected to mongoDb")
});
  


// route setup
var users = require('./routes/users');
var file = require('./routes/file');



// Init App
var app = express();




app.use(cors());



// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));



app.use('/users', users);
app.use('/file', file);

// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'public/index.html'));
// })

// Set Port
app.set('port', (process.env.PORT || 3000));

// starting server
app.listen(app.get('port'), function(){
	console.log(config.database)
	console.log('Server started on port '+app.get('port'));
	console.log(__dirname);
});