

angular.module(ApplicationConfiguration.applicationModuleName,
               ApplicationConfiguration.applicationModuleVendorDependencies);

angular.module(ApplicationConfiguration.applicationModuleName).config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', { templateUrl: '/partials/main/main', controller: 'mainCtrl'});
});

angular.module(ApplicationConfiguration.applicationModuleName).controller('mainCtrl', function ($scope) {
  $scope.myVar = "Hello World";
});