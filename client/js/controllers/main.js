app.controller('mainController', ['$scope', 'instagram', 'feeder', 'myFactory', '$http', '$interval', '$location', '$routeParams','$filter', '$document', '$window', '$auth', '$rootScope', '$mdSidenav', function($scope, instagram, feeder, myFactory, $http, $interval, $location, $routeParams, $filter, $document, $window, $auth, $rootScope, $mdSidenav){
  var vm = this;

  vm.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.getFeed = function() {
    $http.get('http://localhost:5000/auth/api/feed').then(function (response) {
      $scope.photos = response.data;
    });
  };

  $scope.getItemsForSale = function() {
    $http.get('http://localhost:5000/api/items').then(function (response) {
      $scope.itemsForSale = response.data;
    });
  };

  $scope.imageInfo = function() {
    $scope.newItemUrl = this.photo;
  };

  $scope.imageInquiry = function() {
    $rootScope.inquiryImg = this.item;
  };


  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function(response) {
        $window.localStorage.currentUser = JSON.stringify(response.data.user);
        $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        $rootScope.user = response.data.user;
        $rootScope.token = response.data.token;
        $location.path('/profile');
      })
      .catch(function(response) {
        console.log(response);
      });
  };

  $scope.logout = function() {
    $auth.logout();
    delete $window.localStorage.currentUser;
    $location.path('/');
  };


}]);

//Controller For New Item Input
// Dropdown Options - Form Submit
app.controller('ItemCtrl', function($scope) {

    $scope.categories = ('Shirt Blouse Sweater Jacket Skirt Dress Pants Shorts Shoes Accessories').split(' ').map(function(category) {
        return {abbrev: category};
      });

    $scope.sizes = ('N/A XS SM M L XL O/S').split(' ').map(function(size) {
        return {abbrev: size};
      });

    $scope.conditions = ('New Lightly-Worn Well-Worn Vintage').split(' ').map(function(condition) {
        return {abbrev: condition};
      });
  });



// TEST MODAL POPUP
app.controller('AppCtrl', ['$scope', '$mdDialog', function($scope, $mdDialog){
  var alert;
  $scope.showDialog = showDialog;
  $scope.items = 1;

  function showDialog($event) {
    console.log($scope.inquiryImg);
    var parentEl = angular.element(document.querySelector('md-content'));
    alert = $mdDialog.alert({
      parent: parentEl,
      targetEvent: $event,
      template:
        '<md-dialog aria-label="Sample Dialog" layout="row">' +
        '  <md-content flex>'+
        '       <img style="margin: auto; max-width: 100%;" alt="Lush mango tree" src={{ctrl.image.imgUrl}}>' +
        '  </md-content>' +
        '  <md-content flex>'+
        '       <h1>{{ ctrl.image.title }}</h1>' +
        '       <a href="https://www.instagram.com/{{ctrl.image.seller}}"><h4>{{ ctrl.image.seller }}</h4></a>' +
        '       <p>Asking Price: ${{ ctrl.image.minimum }}</p>' +
        '       <p>Size: {{ ctrl.image.size }}</p>' +
        '       <p>Category: {{ ctrl.image.category }}</p>' +
        '       <p>Brand: {{ ctrl.image.brand }}</p>' +
        '       <p>Description: {{ ctrl.image.summary }}</p>' +
        '  <div class="md-actions">' +
        '    <md-button ng-click="closeDialog()">' +
        '      Close' +
        '    </md-button>' +
        '    <md-button ng-if="isAuthenticated()" ng-click="closeDialog()">' +
        '      Make An Offer' +
        '    </md-button>' +
        '    <md-button ng-if="!isAuthenticated()" ng-click="authenticate(' + '&quot;instagram&quot;' + ')">' +
        '      Sign In To Bid' +
        '    </md-button>' +
        '  </div>' +
        '  </md-content>' +
        '</md-dialog>',
        locals: {
          image: $scope.inquiryImg,
          closeDialog: $scope.closeDialog
        },
        bindToController: true,
        controllerAs: 'ctrl',
        controller: 'DialogController'
    });

    $mdDialog
      .show( alert )
      .finally(function() {
        alert = undefined;
      });
  }
  $scope.closeDialog = function() {
    $mdDialog.hide();
  };
}]);

app.controller('DialogController', function($scope, $mdDialog) {
  // alert( this.closeDialog );
  this.closeDialog = $scope.closeDialog;

  $scope.closeDialog = function() {
      $mdDialog.hide();
    };
});
