/* global angular */

'use strict';

angular.module('toolmgr.instances', ['ngRoute', 'ngResource'])

/**
 * Configure "ToolInstance" REST API Client
 */
.factory('ToolInstance', [ '$resource', function($resource) {
  // TODO: How to handle "maps" as $resource?
  return $resource('/toolserver/instances/:id', { id:'@id' });
}])

/**
 * Configure up a route to the "ToolInstances" view
 */
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/instances', {
    templateUrl: 'instances/instances.html',
    controller: 'ToolInstancesCtrl',
    controllerAs: 'instances'
  });
}])

/**
 * The controller for our "ToolInstances" view
 */
.controller('ToolInstancesCtrl', [ '$log', '$routeParams', 'ToolInstance', 'Tool',
        function($log, $routeParams, ToolInstance, Tool) {
    var instances = this;
    
    /* Tool parameters */
    instances.template = {}; //new ToolInstance();
    instances.template.name = $routeParams['name'] || 'jupyterlab';
    
    /* API parameters */
    instances.template.key = $routeParams['key'] || '';
    instances.template.ownerId = $routeParams['ownerId'] || '';
    
    /* Dataset parameters */
    instances.template.datasetName = $routeParams['datasetName'] || '';
    instances.template.datasetId = $routeParams['datasetId'] || '';
    instances.template.dataset = $routeParams['dataset'] || '';
    
    /* Creates a new ToolInstance from the template */
    instances.create = function(template) {
      var newInstance = new ToolInstance(instances.template);
      newInstance.$save(function() {
        $log.debug('Successfully created ToolInstance:' + template.name);
      }, function() {
        $log.error('Failed creating ToolInstance:' + template.name);
      });
    };
    
    /* Retrieves the list of ToolInstances */
    (instances.retrieve = function() {
      instances.list = ToolInstance.get({ ownerId: $routeParams['ownerId'] || '' }, function() {
        $log.debug('Successfully populated ToolInstances!');
      }, function() {
        $log.error('Failed populating ToolInstances!');
      });
    })();
    
    /* Updates an existing ToolInstance */
    instances.update = function(instance) {
      instance.$save(function() {
        $log.debug('Successfully saved ToolInstance:' + instance.name);
      }, function() {
        $log.error('Failed saving ToolInstance:' + instance.name);
      });
    };
    
    /* Deletes an existing ToolInstance */
    instances.delete = function(instance) {
      instance.$delete(function() {
        $log.debug('Successfully deleted ToolInstance:' + instance.name);
      }, function() {
        $log.error('Failed deleting ToolInstance:' + instance.name);
      });
    };
}]);