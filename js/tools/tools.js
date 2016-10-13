/* global angular */

'use strict';

angular.module('toolmgr.tools', ['ngRoute', 'ngResource', 'toolmgr.instances' ])

/**
 * Configure "Toolbox" REST API Client
 */
.factory('Tool', [ '$resource', function($resource) {
  return $resource('/toolserver/tools', {});
}])

/**
 * Configure up a route to the "Toolbox" view
 */
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tools', {
    templateUrl: 'tools/tools.html',
    controller: 'ToolCtrl',
    controllerAs: 'tools'
  });
}])

/**
 * The controller for our "Toolbox" view
 */
.controller('ToolCtrl', [ '$log', '$routeParams', 'Tool', function($log, $routeParams, Tool) {
    var tools = this;
    
    /* Retrieve the list of Tools */
    (tools.retrieve = function() {
      tools.list = Tool.get({}, function() {
        $log.debug('Successfully populated Tools!');
      }, function() {
        $log.error('Failed populating Tools!');
      });
    })();
}]);