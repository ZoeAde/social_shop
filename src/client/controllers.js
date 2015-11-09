myApp.controller('mainController', function($scope, $http) {

    $scope.formData = {};
    $scope.todoData = {};

    // Get all todos
    $http.get('/api/v1/todos')
        .success(function(data) {
            $scope.todoData = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });

// Create a new todo
$scope.createTodo = function(todoID) {
    $http.post('/api/v1/todos', $scope.formData)
        .success(function(data) {
            $scope.formData = {};
            $scope.todoData = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
};

$scope.deleteTodo = function(todoID) {
    $http.delete('/api/v1/todos/' + todoID)
        .success(function(data) {
            $scope.todoData = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
};
});

myApp.controller('DemoCtrl', function () {
    this.topDirections = ['left', 'up'];
    this.bottomDirections = ['down', 'right'];
    this.isOpen = false;
    this.availableModes = ['md-fling', 'md-scale'];
    this.selectedMode = 'md-fling';
    this.availableDirections = ['up', 'down', 'left', 'right'];
    this.selectedDirection = 'up';
});

myApp.controller('feedCtrl', function ($scope, $timeout, $mdUtil, $mdSidenav, $log, $mdDialog, $mdToast, $document) {
    console.log('feedCtrl');

    // *** Sidenav *** //

    $scope.toggleLeft = buildToggler('left');
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          },200);
      return debounceFn;
    }

    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };

    // *** List *** //

    // var imagePath = 'images/profile_image.jpeg';

    // $scope.phones = [
    //   { type: 'Home', number: '(555) 251-1234' },
    //   { type: 'Cell', number: '(555) 786-9841' },
    // ];

    // $scope.todos = [
    //   {
    //     face : imagePath,
    //     what: 'Brunch this weekend?',
    //     who: 'Min Li Chan',
    //     when: '3:08PM',
    //     notes: " I'll be in your neighborhood doing errands"
    //   },
    //   {
    //     face : imagePath,
    //     what: 'Brunch this weekend?',
    //     who: 'Min Li Chan',
    //     when: '3:08PM',
    //     notes: " I'll be in your neighborhood doing errands"
    //   },
    //   {
    //     face : imagePath,
    //     what: 'Brunch this weekend?',
    //     who: 'Min Li Chan',
    //     when: '3:08PM',
    //     notes: " I'll be in your neighborhood doing errands"
    //   },
    //   {
    //     face : imagePath,
    //     what: 'Brunch this weekend?',
    //     who: 'Min Li Chan',
    //     when: '3:08PM',
    //     notes: " I'll be in your neighborhood doing errands"
    //   },
    //   {
    //     face : imagePath,
    //     what: 'Brunch this weekend?',
    //     who: 'Min Li Chan',
    //     when: '3:08PM',
    //     notes: " I'll be in your neighborhood doing errands"
    //   },
    // ];

    // *** Grid *** //

    // *** User Menu *** //
    var originatorEv;

    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    // $scope.announceClick = function(index) {
    //   $mdDialog.show(
    //     $mdDialog.alert()
    //       .title('You clicked!')
    //       .content('You clicked the menu item at index ' + index)
    //       .ok('Nice')
    //       .targetEvent(originatorEv)
    //   );
    //   originatorEv = null;
    // };

    // *** Toast *** //
    // var last = {
    //     bottom: false,
    //     top: true,
    //     left: false,
    //     right: true
    //   };
    // $scope.toastPosition = angular.extend({},last);
    // $scope.getToastPosition = function() {
    //   sanitizePosition();
    //   return Object.keys($scope.toastPosition)
    //     .filter(function(pos) { return $scope.toastPosition[pos]; })
    //     .join(' ');
    // };
    // function sanitizePosition() {
    //   var current = $scope.toastPosition;
    //   if ( current.bottom && last.top ) current.top = false;
    //   if ( current.top && last.bottom ) current.bottom = false;
    //   if ( current.right && last.left ) current.left = false;
    //   if ( current.left && last.right ) current.right = false;
    //   last = angular.extend({},current);
    // }
    // $scope.showCustomToast = function() {
    //   $mdToast.show({
    //     controller: 'ToastCtrl',
    //     templateUrl: 'views/toast-template.html',
    //     parent : $document[0].querySelector('#toastBounds'),
    //     hideDelay: 6000,
    //     position: $scope.getToastPosition()
    //   });
    // };
    // $scope.showSimpleToast = function() {
    //   $mdToast.show(
    //     $mdToast.simple()
    //       .content('Simple Toast!')
    //       .position($scope.getToastPosition())
    //       .hideDelay(3000)
    //   );
    // };
    // $scope.showActionToast = function() {
    //   var toast = $mdToast.simple()
    //         .content('Action Toast!')
    //         .action('OK')
    //         .highlightAction(false)
    //         .position($scope.getToastPosition());
    //   $mdToast.show(toast).then(function(response) {
    //     if ( response == 'ok' ) {
    //       alert('You clicked \'OK\'.');
    //     }
    //   });
    // };
})
