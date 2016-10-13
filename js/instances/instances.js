/* global angular */

'use strict';

angular.module('toolmgr.instances', ['ngRoute', 'ngResource'])

/**
 * Configure "Instances" REST API Client
 */
.factory('ToolInstances', [ '$resource', function($resource) {
  return $resource('/toolserver/instances/:ownerId', {ownerId:'@id'});
}])

/**
 * Generates a new ToolInstance object using the provided parameters.
 * 
 * TODO: Should we handle multiple dataset (i.e. arrays)?
 * 
 *  Inputs:
 *  -toolKey: string
 *  -ownerId: string or int (API-dependent)
 *  -apiKey: string or int (API-dependent)
 *  -dataset: {} (must be serializable?)
 *    -name: string
 *    -data: [] or {}? (API-dependent / data type)
 *    -path: string
 *    -id: string or int (API-dependent)
 *  
 *  Output: {}
 *  -dataset
 *  -datasetId
 *  -datapath
 *  -datasetName
 *  -key
 *  -name
 *  -ownerId
 */
.service('ToolInstance', [function() {
  return function(toolKey, ownerId, apiKey, dataset) {
    var toolInstance = {};
    
    toolInstance.name = toolKey;
    toolInstance.ownerId = ownerId;
    toolInstance.apiKey = apiKey;
    
    if (dataset) {
      toolInstance.dataset = dataset.data;
      toolInstance.datasetName = dataset.name;
      toolInstance.datasetId = dataset.id;
      toolInstance.datapath = dataset.path;
    }
    
    return toolInstance;
  };
}])

/**
 * Configure up a route to the "ToolInstances" view
 */
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/instances', {
    templateUrl: 'instances/instances.html',
    controller: 'ToolInstancesCtrl',
    controllerAs: 'vm'
  });
}])

/**
 * The controller for our "ToolInstances" view
 */
.controller('ToolInstancesCtrl', [ '$log', '$routeParams', 'ToolInstances', 'ToolInstance', function($log, $routeParams, ToolInstances, ToolInstance) {
    var vm = this;
    
    /* Input parameters */
    vm.toolKey = $routeParams['name'] || 'jupyter';
    vm.apiKey = $routeParams['apiKey'] || '';
    vm.ownerId = $routeParams['ownerId'] || ''
    vm.dataset = {
      name: $routeParams['datasetName'] || '',
      id: $routeParams['datasetId'] || '',
      data: $routeParams['dataset'] || [],
      path: $routeParams['datasetPath'] || ''
    };
    
    vm.generate = function(toolKey, apiKey, ownerId, dataset) {
      var toolInstance = new ToolInstance(toolKey, apiKey, ownerId, dataset);
      ToolInstance.post({}, toolInstance, function() {
        $log.debug('Successfully created ' + toolKey);
      }, function() {
        $log.error('Failed creating ' + toolKey);
      });
    };
    
    vm.instances = ToolInstances.get({ ownerId: $routeParams['ownerId'] || '' }, function() {
      $log.debug('Successfully populated ToolInstances!');
    }, function() {
      $log.error('Failed populating ToolInstances!');
    });
}]);