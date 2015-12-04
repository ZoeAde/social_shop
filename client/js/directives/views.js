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




// TABLE directives
// app.directive('mdColresize', function ($timeout) {
//   return {
//     restrict: 'A',
//     link: function (scope, element, attrs) {
//       scope.$evalAsync(function () {
//         $timeout(function(){ $(element).colResizable({
//           liveDrag: true,
//           fixed: true

//         });},100);
//       });
//     }
//   }
// });

app.directive('mdTable', function () {
  return {
    restrict: 'E',
    scope: {
      headers: '=',
      content: '=',
      sortable: '=',
      filters: '=',
      customClass: '=customClass',
      thumbs:'=',
      count: '='
    },
    controller: function ($scope,$filter,$window) {
      var orderBy = $filter('orderBy');
        $scope.handleSort = function (field) {
          if ($scope.sortable.indexOf(field) > -1) { return true; } else { return false; }
      };
      $scope.order = function(predicate, reverse) {
          $scope.content = orderBy($scope.content, predicate, reverse);
          $scope.predicate = predicate;
      };
      $scope.order($scope.sortable[0],false);
      $scope.getNumber = function (num) {
                return new Array(num);
      };
    },
    template: angular.element(document.querySelector('#md-table-template')).html()
  };
});
