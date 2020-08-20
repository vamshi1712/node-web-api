var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pets');

//if application type is json
app.use(bodyParser.json());
//if form submit
app.use(bodyParser.urlencoded({
    extended:true
}));

//move all the route definition to cats file for seperation concern 
var cats = require('./routes/cat.js')(app);

var server = app.listen(3000, function () {
    console.log('Server running at http://127.0.0.1:3000/');
});