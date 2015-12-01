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
router.put('/api/user/:token', function(req, res) {
  models.User.find({
    where: {
      token: req.params.token
    }
  }).then(function(user) {
    if(user){
      user.updateAttributes({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode
      }).then(function(user) {
        res.send(user);
      });
    }
  });
});

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

// get all items
router.get('/api/items', function(req, res) {
  models.Item.findAll({
    attributes: ['id', 'title', 'seller', 'buyer', 'size', 'category', 'condition', 'brand', 'summary', 'minimum', 'imgUrl', 'status', 'createdAt', 'updatedAt' ]
  }).then(function(items) {
    console.log('my items are:', items);
    res.json(items);
  });
});

// get all items listed by unique user
router.get('/api/item/:seller/listings', function(req, res) {
  models.Item.findAll({
    where: {
      seller: req.params.seller
    }
  }).then(function(items) {
    console.log('my items are:', items);
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
// //post new bid
router.post('/api/bids', function(req, res) {
  models.Bid.create({
    itemId: req.body.itemId,
    userId: req.body.userId,
    bidAmount: req.body.bidAmount,
  }).then(function(item) {
    res.json(item);
  });
});

module.exports = router;
