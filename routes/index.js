const express = require('express');
const router = express.Router();
const Promise = require('bluebird');

const models = require('../models/tables.js');
const Place = models.Place;
const Hotel = models.Hotel;
const Activity = models.Activity;
const Restaurant = models.Restaurant;

router.get('/', function(req, res, next) {
  var hotelNamesPromise = Hotel.findAll({
    attributes: ['name']
  })

  var activityNamesPromise = Activity.findAll({
    attributes: ['name']
  })

  var restaurantNamesPromise = Restaurant.findAll({
    attributes: ['name']
  })

Promise.all([hotelNamesPromise, activityNamesPromise, restaurantNamesPromise])
  .then(function (names) {
    // res.json(names[0][0].name)
    res.render('index', {names: names})
  })
})

module.exports = router;
