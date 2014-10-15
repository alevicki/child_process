var express = require('express');
var spawn = require('child_process').spawn;

var app = express();

app.get('/ps', function (req, res) {
  var ps = spawn('ps', ['aux']);
  ps.stdout.pipe(res);
});

var server = app.listen(3000, function () {
  console.log('Server listening on port 3000');
});