var app = require('express')();
var https = require('https');
var http = require('http');
var fs = require('fs');
var path = require('path');


var privateKey = fs.readFileSync('/home/ssl/server.key').toString();
var certificate = fs.readFileSync('/home/ssl/server.crt').toString();

var server = https.createServer({key:privateKey,cert:certificate},app);

//var server = http.createServer(app);
var io = require('socket.io').listen(server);

var socket = io.connect('https://localhost:3031/', { agent: https.globalAgent });

io.sockets.on('connection', function (socket) {
    console.log('User connected');
  });

var express=require('express');
app.use(express.static(__dirname + '/Demo'));

app.get('/', function (req, res) {
    res.sendFile('/desktop-wrapper/index.html/');
  //res.sendfile(__dirname + '/index.html');
});


server.listen(3031,function(){
console.log('listening on *:3031');
});
