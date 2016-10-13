/* global angular */

'use strict';

angular.module('toolmgr.logs', ['ngRoute', 'ngResource'])

/**
 * Configure "Logs" REST API Client
 */
.factory('ToolManagerLogs', [ '$resource', function($resource) {
  return $resource('/toolserver/logs', {});
}])

/**
 * Configure up a route to the "Logs" view
 */
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/logs', {
    templateUrl: 'logs/logs.html',
    controller: 'LogsCtrl',
    controllerAs: 'vm'
  });
}])

/**
 * The controller for our "Logs" view
 */
.controller('LogsCtrl', [ '$log', '$routeParams', 'ToolManagerLogs',  function($log, $routeParams, ToolManagerLogs) {
    var vm = this;
    
    vm.logs = ToolManagerLogs.get({}, function() {
      $log.debug('Successfully populated ToolManagerLogs!');
    }, function() {
      $log.error('Failed populating ToolManagerLogs!');
    });
}]);