var app = angular.module('app', ['ngRoute', 'ngTouch', 'ui.bootstrap']);

app.constant('SERVICE_BASE_URL', 'http://localhost:5000');

app.config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/home.html',
    controller: 'HomeController',
    controllerAs: 'ctl'
//  }).when('/items/:itemId', {
//    templateUrl: 'views/items/show.html',
//    controller: 'ItemListController',
//    controllerAs: 'ctl'
//  }).otherwise({
//    redirectTo: '/'
  });
});