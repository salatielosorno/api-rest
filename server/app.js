/*Dependencies*/
var express = require('express');
var app = express();
var routes = require('./routes/cats');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./_config');

/*Mongoose*/
mongoose.connect(config.MongoURI.test, { useNewUrlParser:true});

/*Middleware*/
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/*Routes*/
app.use(routes);

app.listen(3000, ()=> console.log('Example app listening on port 3000'));

module.exports = app;