var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var querystring = require('querystring');
var port = 8888;
var app = express();

app.use('/', express.static(__dirname + '/app'))
  //  .use(cookieParser());
app.get('*', function(req, res) {
  res.sendfile('./app/index.html');
});

console.log("tuning into " + port + " radio.");
app.listen(port);
