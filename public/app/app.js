

angular.module(ApplicationConfiguration.applicationModuleName,
               ApplicationConfiguration.applicationModuleVendorDependencies);

angular.module(ApplicationConfiguration.applicationModuleName).config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {templateUrl: '/partials/main/main', controller: 'mainCtrl'})
    .when('/login', {templateUrl: '/partials/account/login', controller: 'rbLoginController'})
    .when('/signup', {templateUrl: '/partials/account/signup', controller: 'rbSignUpController'})
    .when('/newRecipe', {templateUrl: '/partials/recipe/new-recipe', controller: 'rbAddOrUpdateRecipeController'});
});

angular.module(ApplicationConfiguration.applicationModuleName).controller('mainCtrl', function () {
});

//TODO-licavalc: consider ditching angular-route for ui-route