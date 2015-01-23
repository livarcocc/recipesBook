angular.module('recipesBook', ['ngResource', 'ngRoute']);

angular.module('recipesBook').config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', { templateUrl: '/partials/main/main', controller: 'mainCtrl'});
});

angular.module('recipesBook').controller('mainCtrl', function ($scope) {
  $scope.myVar = "Hello World";
});