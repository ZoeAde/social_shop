// SHOP TAB
angular.module('myApp').directive('shop', function() {
  return {
    restrict: 'E',
    templateUrl: '../views/listings.html',
  };
});

// LISTINGS TAB
angular.module('myApp').directive('myListings', function() {
  return {
    restrict: 'E',
    templateUrl: '../views/mylistings.html',
  };
});

// BIDS TAB
angular.module('myApp').directive('bids', function() {
  return {
    restrict: 'E',
    templateUrl: '../views/bids.html',
  };
});

// WISHLIST TAB
angular.module('myApp').directive('wishlist', function() {
  return {
    restrict: 'E',
    templateUrl: '../views/wishlist.html',
  };
});

// NEW LISTING TAB
angular.module('myApp').directive('newItem', function() {
  return {
    restrict: 'E',
    templateUrl: '../views/newListing.html',
  };
});

// PROFILE TAB
angular.module('myApp').directive('myProfile', function() {
  return {
    restrict: 'E',
    templateUrl: '../views/myProfile.html',
  };
});
