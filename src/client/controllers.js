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


myApp.controller('MainCtrl', function ($scope, $timeout, $mdUtil, $mdSidenav, $log, $mdDialog, $mdToast, $document) {
    console.log('MainCtrl');

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

    var imagePath = 'images/profile_image.jpeg';

    $scope.phones = [
      { type: 'Home', number: '(555) 251-1234' },
      { type: 'Cell', number: '(555) 786-9841' },
    ];

    $scope.todos = [
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
    ];

    // *** Grid *** //

    // *** User Menu *** //
    var originatorEv;

    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    $scope.announceClick = function(index) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('You clicked!')
          .content('You clicked the menu item at index ' + index)
          .ok('Nice')
          .targetEvent(originatorEv)
      );
      originatorEv = null;
    };

    // *** Toast *** //
    var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
      };
    $scope.toastPosition = angular.extend({},last);
    $scope.getToastPosition = function() {
      sanitizePosition();
      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };
    function sanitizePosition() {
      var current = $scope.toastPosition;
      if ( current.bottom && last.top ) current.top = false;
      if ( current.top && last.bottom ) current.bottom = false;
      if ( current.right && last.left ) current.left = false;
      if ( current.left && last.right ) current.right = false;
      last = angular.extend({},current);
    }
    $scope.showCustomToast = function() {
      $mdToast.show({
        controller: 'ToastCtrl',
        templateUrl: 'views/toast-template.html',
        parent : $document[0].querySelector('#toastBounds'),
        hideDelay: 6000,
        position: $scope.getToastPosition()
      });
    };
    $scope.showSimpleToast = function() {
      $mdToast.show(
        $mdToast.simple()
          .content('Simple Toast!')
          .position($scope.getToastPosition())
          .hideDelay(3000)
      );
    };
    $scope.showActionToast = function() {
      var toast = $mdToast.simple()
            .content('Action Toast!')
            .action('OK')
            .highlightAction(false)
            .position($scope.getToastPosition());
      $mdToast.show(toast).then(function(response) {
        if ( response == 'ok' ) {
          alert('You clicked \'OK\'.');
        }
      });
    };
})
myApp.controller('DemoCtrl', function () {
    this.topDirections = ['left', 'up'];
    this.bottomDirections = ['down', 'right'];
    this.isOpen = false;
    this.availableModes = ['md-fling', 'md-scale'];
    this.selectedMode = 'md-fling';
    this.availableDirections = ['up', 'down', 'left', 'right'];
    this.selectedDirection = 'up';
})

myApp.controller('ToastCtrl', function($scope, $mdToast) {
  $scope.closeToast = function() {
    $mdToast.hide();
  };
})

myApp.controller('BottomSheetExample', function($scope, $timeout, $mdBottomSheet, $mdToast) {
  $scope.alert = '';
  $scope.showListBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'bottom-sheet-list-template.html',
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem['name'] + ' clicked!';
    });
  };
  $scope.showGridBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'views/bottom-sheet-grid-template.html',
      controller: 'GridBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $mdToast.show(
            $mdToast.simple()
              .content(clickedItem)
              .position('top right')
              .hideDelay(1500)
          );
    });
  };
    this.tiles = buildGridModel({
            icon : "avatar:svg-",
            title: "Svg-",
            background: ""
          });

    function buildGridModel(tileTmpl){
      var it, results = [ ];

      for (var j=0; j<11; j++) {

        it = angular.extend({},tileTmpl);
        it.icon  = it.icon + (j+1);
        it.title = it.title + (j+1);
        it.span  = { row : 1, col : 1 };

        switch(j+1) {
          case 1:
            it.background = "red";
            it.span.row = it.span.col = 1;
            break;

          case 2:
            it.background = "green";
            break;

          case 3:
            it.background = "darkBlue";
            break;

          case 4:
            it.background = "blue";
            it.span.row = it.span.col = 1;
            break;

          case 5:
            it.background = "yellow";
            it.span.row = it.span.col = 2;
            break;

          case 6:
            it.background = "pink";
            it.span.row = it.span.col = 2;
            break;

          case 7:
            it.background = "darkBlue";
            it.span.row = it.span.col = 1;
            break;

          case 8:
            it.background = "purple";
            it.span.row = it.span.col = 1;
            break;

          case 9:
            it.background = "deepBlue";
            it.span.row = it.span.col = 3;
            break;

          case 10:
            it.background = "lightPurple";
            it.span.row = it.span.col = 1;
            break;

          case 11:
            it.background = "yellow";
            it.span.row = it.span.col = 2;
            break;

        }
        results.push(it);
      }
      return results;
    }
  })
myApp.controller('GridBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.listItemClick = function(clickedItem) {
    $mdBottomSheet.hide(clickedItem);
  };
});


myApp.controller('DemoCtrl', function($scope) {
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

