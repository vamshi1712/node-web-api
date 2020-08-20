var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
// const { functions } = require('lodash');

mongoose.connect('mongodb://127.0.0.1:27017/dogs', function(err){
    // console.log(err);
});

//if application type is json
app.use(bodyParser.json());
//if form submit
app.use(bodyParser.urlencoded({
    extended:true
}));

//move all the route definition to cats file for seperation concern 
var dogs = require('./routes/dog.js')(app);

var server = app.listen(3001, function () {
    console.log('Server running at http://127.0.0.1:3001/');
});