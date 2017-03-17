const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const app = express();

//later folders / files
const routes = require('./routes');
const models = require('./models/tables.js');

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

models.Place.sync({})
.then(function () {
    return models.Hotel.sync({})
})
.then(function() {
    return models.Activity.sync({})
})
.then(function() {
    return models.Restaurant.sync({})
})
.then(function () {
    app.listen(3000, function () {
        console.log('on port 3000');
    });
})
.catch(console.error);


app.use('*', function(req, res) {
  res.status(404).render('error');
})
