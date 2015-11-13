var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//created new user in db
router.post('/users', function(req, res) {
  models.User.create({
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    instagram: req.body.instagram
  }).then(function(user) {
    res.json(user);
  });
});



module.exports = router;
