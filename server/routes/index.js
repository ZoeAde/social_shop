var path = require('path');
var express = require('express');
var router = express.Router();
var models = require('../models/index');


// /////////////////USERS/////////////////
// // get single user
router.get('/api/user/:token', function(req, res) {
  models.User.find({
    where: {
      token: req.params.token
    }
  }).then(function(user) {
    res.json(user);
  });
});

// // update single user
// router.put('/user/:id', function(req, res) {
//   models.User.find({
//     where: {
//       id: req.params.id
//     }
//   }).then(function(user) {
//     if(user){
//       user.updateAttributes({
//         name: req.body.name,
//         email: req.body.email,
//         username: req.body.username,
//         code:req.body.code
//       }).then(function(user) {
//         res.send(user);
//       });
//     }
//   });
// });

///////////////ITEMS////////////////
// //post new item
router.post('/api/items', function(req, res) {
  models.Item.create({
    title: req.body.title,
    seller: req.body.seller,
    buyer: req.body.buyer,
    size: req.body.size,
    category: req.body.category,
    condition: req.body.condition,
    brand: req.body.brand,
    summary: req.body.summary,
    minimum: req.body.minimum,
    imgUrl: req.body.imgUrl,
    status: req.body.status
  }).then(function(item) {
    res.json(item);
  });
});

// // get all items
router.get('/api/items', function(req, res) {
  models.Item.findAll({}).then(function(items) {
    console.log(items);
    res.json(items);
  });
});

// // get single item
// router.get('/item/:id', function(req, res) {
//   models.Item.find({
//     where: {
//       id: req.params.id
//     }
//   }).then(function(item) {
//     res.json(item);
//   });
// });

// // add new item
// router.post('/items', function(req, res) {
//   models.Item.create({
//     seller: req.body.seller,
//     buyer: req.body.buyer,
//     size: req.body.size,
//     category: req.body.category,
//     description: req.body.description,
//     condition: req.body.condition,
//     status: req.body.status,
//     minimum: req.body.minimum,
//     imgUrl: req.body.imgUrl
//   }).then(function(item) {
//     res.json(item);
//   });
// });

// // update single item
// router.put('/item/:id', function(req, res) {
//   models.Item.find({
//     where: {
//       id: req.params.id
//     }
//   }).then(function(item) {
//     if(item){
//       item.updateAttributes({
//         seller: req.body.seller,
//         buyer: req.body.buyer,
//         size: req.body.size,
//         category: req.body.category,
//         description: req.body.description,
//         condition: req.body.condition,
//         status: req.body.status,
//         minimum: req.body.minimum,
//         imgUrl: req.body.imgUrl,
//         complete: req.body.complete
//       }).then(function(item) {
//         res.send(item);
//       });
//     }
//   });
// });

// // delete a single item
// router.delete('/item/:id', function(req, res) {
//   models.Item.destroy({
//     where: {
//       id: req.params.id
//     }
//   }).then(function(item) {
//     res.json(item);
//   });
// });

// ////////////////////BID///////////////////


module.exports = router;
