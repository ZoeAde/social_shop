angular.module('StarterApp').directive('topNavConstant', function() {
  return {
    restrict: 'E',
    templateUrl: '../partials/nav.html'
  };
});

angular.module('StarterApp').directive('feedTab', function() {
  return {
    restrict: 'E',
    templateUrl: '../partials/feed-tab.html'
  };
});

angular.module('StarterApp').directive('sideNav', function() {
  return {
    restrict: 'E',
    templateUrl: '../partials/side-nav.html',
  };
});
