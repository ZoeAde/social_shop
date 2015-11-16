var app = angular.module('myApp', ['ngRoute', 'angularMoment', 'duScroll', 'satellizer']);

//creating different title name on each page in browser tab
app.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);
