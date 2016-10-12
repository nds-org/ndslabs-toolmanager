'use strict';

// Declare app level module which depends on views, and components
angular.module('toolmgr', [
  'ngRoute',
  'ngResource',
  'toolmgr.tools',
  'toolmgr.instances',
  'toolmgr.services'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);