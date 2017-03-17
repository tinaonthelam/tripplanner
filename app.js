const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');

//later folders / files
const routes = require('./routes');

var app = express();

//add morgan & body parser
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

//to be able to use your static
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', routes)

//for nunjucks rendering
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.listen(3000, function() {
  console.log('listening on port 3000')
})
