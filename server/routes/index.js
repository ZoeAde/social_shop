var express = require('express');
var router = express.Router();
var models = require('../models/index');
var passportInstagram = require('../auth/instagram');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//////////////AUTH/////////////////
router.get('/login', function(req, res, next) {
  res.send('Go back and register!');
});

router.get('/auth/instagram', passportInstagram.authenticate('instagram', { scope: ['basic', 'comments', 'relationships', 'likes'],
    failureRedirect: '/' }));

router.get('/auth/instagram/callback',
  passportInstagram.authenticate('instagram', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });

/////////////////USERS///////////////////
router.post('/users', function(req, res) {
  models.User.create({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    code:req.body.code
  }).then(function(user) {
    res.json(user);
  });
});

// get all users
router.get('/users', function(req, res) {
  models.User.findAll({}).then(function(users) {
    res.json(users);
  });
});

// get single user
router.get('/user/:id', function(req, res) {
  models.User.find({
    where: {
      id: req.params.id
    }
  }).then(function(user) {
    res.json(user);
  });
});

// update single user
router.put('/user/:id', function(req, res) {
  models.User.find({
    where: {
      id: req.params.id
    }
  }).then(function(user) {
    if(user){
      user.updateAttributes({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        code:req.body.code
      }).then(function(user) {
        res.send(user);
      });
    }
  });
});

// delete a single user
router.delete('/user/:id', function(req, res) {
  models.User.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(user) {
    res.json(user);
  });
});


//////////////////ITEMS/////////////////////////
//post new item
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

////////////////////BID///////////////////


module.exports = router;
