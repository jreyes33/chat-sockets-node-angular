'use strict';

angular.module('chat', ['ngRoute'])
.controller('chat', function($scope, server){
  $scope.connected = false;
  $scope.username = '';
  $scope.users = [];
  $scope.messages = [];

  $scope.connect = function() {
    server.emit('request_connection', $scope.username);
  };

  $scope.send_message = function() {
    server.emit('message', $scope.message);
    $scope.message = '';
  }

  server.on('connection_accepted', function(users) {
    $scope.users = users;
    $scope.connected = true;
    $scope.$digest();
  });

  server.on('user_connected', function(username) {
    $scope.users.push(username);
    $scope.$digest();
  });

  server.on('message', function(message, username) {
    $scope.messages.push({username: username, message: message});
    $scope.$digest();
  });
})
.factory('server', function() {
  return io(document.domain + ':8080');
})
.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'views/chat.html',
        controller: 'chat'
    });
});
