'use strict';

angular.module('chat', ['ngRoute'])
.controller('chat', function($scope){

})
.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'views/chat.html',
        controller: 'chat'
    });
});