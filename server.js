var fs = require('fs-extra');
var path = require('path');
var request = require('request');
var express = require('express');
var rewrite = require('express-urlrewrite');
var bodyParser = require('body-parser');

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 80));

// Routes for real application with React-Router
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use(rewrite('/*', '/index.html'));
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
