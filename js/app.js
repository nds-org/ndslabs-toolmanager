/* global angular */

'use strict';

// Declare app level module which depends on views, and components
angular.module('toolmgr', [
  'ngRoute',
  'toolmgr.logs',
  'toolmgr.tools',
  'toolmgr.instances'
])

.config(['$locationProvider', '$logProvider', '$routeProvider', function($locationProvider, $logProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $logProvider.debugEnabled(false);
  $routeProvider.otherwise({redirectTo: '/tools'});
}]);