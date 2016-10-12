'use strict';

// Declare app level module which depends on views, and components
angular.module('toolmgr', [
  'ngRoute',
  'ngResource',
  'toolmgr.tools',
  'toolmgr.instances'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/instances'});
}]);