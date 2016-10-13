/* global angular */

'use strict';

angular.module('toolmgr.tools', ['ngRoute', 'ngResource' ])

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
        tools.selected = (tools.list.length > 0 ? tools.list[0] : null);
      }, function() {
        $log.error('Failed populating Tools!');
      });
    })();
}]);