'use strict';

angular.module('toolmgr.instances', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/instances', {
    templateUrl: 'instances/instances.html',
    controller: 'InstancesCtrl',
    controllerAs: 'vm'
  });
}])

.controller('InstancesCtrl', [function() {
    var vm = this;
    vm.wired = true;
}]);


/*
function InstancesCtrl() {
  this.name = 'John Smith';
  this.contacts = [
    {type: 'phone', value: '408 555 1212'},
    {type: 'email', value: 'john.smith@example.org'}
  ];
}

InstancesCtrl.prototype.greet = function() {
  alert(this.name);
};

InstancesCtrl.prototype.addContact = function() {
  this.contacts.push({type: 'email', value: 'yourname@example.org'});
};

InstancesCtrl.prototype.removeContact = function(contactToRemove) {
 var index = this.contacts.indexOf(contactToRemove);
  this.contacts.splice(index, 1);
};

InstancesCtrl.prototype.clearContact = function(contact) {
  contact.type = 'phone';
  contact.value = '';
};*/