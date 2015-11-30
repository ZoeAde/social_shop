app.controller('mainController', ['$scope', 'instagram', 'feeder', 'myFactory', '$http', '$interval', '$location', '$routeParams', '$filter', '$document', '$window', '$auth', '$rootScope', function($scope, instagram, feeder, myFactory, $http, $interval, $location, $routeParams, $filter, $document, $window, $auth, $rootScope){

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
      // $scope.itemsForSale = response.data;
      console.log($scope.itemsForSale);
    });
  };

  $scope.imageInfo = function() {
    $scope.newItemUrl = this.photo;
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
  };

  $scope.sizes = 'AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY'.split(' ').map(function(size) {
        return {abbrev: size};
      })




}]);



//New Item Add
app.controller('DemoCtrl', function($scope) {
    $scope.user = {
      title: 'Developer',
      email: 'ipsum@lorem.com',
      firstName: '',
      lastName: '',
      company: 'Google',
      address: '1600 Amphitheatre Pkwy',
      city: 'Mountain View',
      state: 'CA',
      biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
      postalCode: '94043'
    };
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function(state) {
        return {abbrev: state};
      })
  })
  .config(function($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();
  });


//POPUP FOR NEW ITEM
app.controller('ModalCtrl', function($scope, $mdDialog, $mdMedia) {
  $scope.status = '  ';
  $scope.customFullscreen = $mdMedia('sm');

  $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $mdMedia('sm') && $scope.customFullscreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('sm');
    }, function(sm) {
      $scope.customFullscreen = (sm === true);
    });
  };
});
function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}




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
