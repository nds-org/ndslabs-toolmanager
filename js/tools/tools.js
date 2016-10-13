/* global angular */

'use strict';

angular.module('toolmgr.tools', ['ngRoute', 'ngResource', 'toolmgr.instances'])

/**
 * Configure "Tools" REST API Client
 */
.factory('Tools', [ '$resource', function($resource) {
  return $resource('/toolserver/tools', {});
}])

/**
 * Configure up a route to the "Tools" view
 */
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tools', {
    templateUrl: 'tools/tools.html',
    controller: 'ToolsCtrl',
    controllerAs: 'vm'
  });
}])

/**
 * The controller for our "Tools" view
 */
.controller('ToolsCtrl', [ '$log', '$routeParams', 'Tools', function($log, $routeParams, Tools) {
    var vm = this;
    
    vm.tools = Tools.get({}, function() {
      $log.debug('Successfully populated Tools!');
    }, function() {
      $log.error('Failed populating Tools!');
    });
}]);