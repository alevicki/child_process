var express = require('express');
var exec = require('child_process').exec;

require('sugar');

var app = express();

app.get('/ps', function (req, res) {
  var ps = exec('ps aux', {}, function (err, out, err) {
    if (err) {
      return res.send(500);
    }

    var results = [];
    var item;
    var lines = out.split('\n');
    var headers = lines.shift().split(/\s+/);
    headers = headers.map(function (header) {
      return header.trim();
    });

    lines.each(function (line) {
      item = {};
      var sections = line.split(/\s+/);
      if (sections.length < headers.length) {
        // The input has an empty last line usually
        return;
      }
      if (sections.length > headers.length) {
        // Reformat the command since it got split above, note that this may not
        // replace spcaces exactly, but for the purposes of this demo it is fine
        sections[headers.length - 1] = sections.slice(headers.length - 1).join(' ');
      }
      headers.each(function (header, index) {
        item[header] = sections[index];
      });

      results.push(item);
    });

    res.send(results);

  });
});

var server = app.listen(3000, function () {
  console.log('Server listening on port 3000');
});