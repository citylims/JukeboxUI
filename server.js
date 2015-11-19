var express = require('express');
var port = 8888
var app = express();

app.use('/', express.static(__dirname + '/app'))

app.get('*', function(req, res) {
  res.sendfile('./app/index.html');
});

console.log('Listening on ' + port);
app.listen(port);
