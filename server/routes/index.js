var express = require('express');
var router = express.Router();
var models = require('../models/index');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/users', function(req, res) {
  models.User.create({
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    instagram: req.body.instagram,
  }).then(function(user) {
    res.json(user);
  });
});

// get all items
router.get('/items', function(req, res) {
  models.Item.findAll({}).then(function(items) {
    res.json(items);
  });
});

// get single item
router.get('/item/:id', function(req, res) {
  models.Item.find({
    where: {
      id: req.params.id
    }
  }).then(function(item) {
    res.json(item);
  });
});

// add new item
router.post('/items', function(req, res) {
  models.Item.create({
    seller: req.body.seller,
    buyer: req.body.buyer,
    size: req.body.size,
    category: req.body.category,
    description: req.body.description,
    condition: req.body.condition,
    status: req.body.status,
    minimum: req.body.minimum,
    imgUrl: req.body.imgUrl
  }).then(function(item) {
    res.json(item);
  });
});

// update single item
router.put('/item/:id', function(req, res) {
  models.Item.find({
    where: {
      id: req.params.id
    }
  }).then(function(item) {
    if(item){
      item.updateAttributes({
        seller: req.body.seller,
        buyer: req.body.buyer,
        size: req.body.size,
        category: req.body.category,
        description: req.body.description,
        condition: req.body.condition,
        status: req.body.status,
        minimum: req.body.minimum,
        imgUrl: req.body.imgUrl,
        complete: req.body.complete
      }).then(function(item) {
        res.send(item);
      });
    }
  });
});

// delete a single item
router.delete('/item/:id', function(req, res) {
  models.Item.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(item) {
    res.json(item);
  });
});

module.exports = router;
