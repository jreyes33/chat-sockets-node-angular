'use strict';
var socketio = require('socket.io');
var express = require('express');

var app = express(); //we initialize an express app
var http_listener = app.listen(8080); //tell express to listen the port 8080
var io = socketio.listen(http_listener); //tell socket.io to listen in our app

var users = [];

//we subscrive to the client connection event
io.sockets.on('connection', function(client){
    console.log('client connected...');
    var username;

    client.on('request_connection', function(_username) {
      username = _username;
      console.log('User connected as ' + username);
      users.push(username);
      client.emit('connection_accepted', users);
      client.broadcast.emit('user_connected', username);
    });

    client.on('message', function(message) {
      console.log(username + ': ' + message);
      io.emit('message', message, username);
    });
});

app.get('/', function(req, res){
    res.sendfile(__dirname + '/client/views/index.html');
});

app.use('/', express.static(__dirname + '/client'));

console.log('Chat server listening to http://localhost:8080');
