'use strict';

angular.module('toolmgr.tools', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tools', {
    templateUrl: 'tools/tools.html',
    controller: 'ToolsCtrl'
  });
}])

.controller('ToolsCtrl', [ '$scope', function($scope) {
    $scope.wired = true;
}]);