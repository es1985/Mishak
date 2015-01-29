var app = require('express')();
var https = require('https');
var http = require('http');
var fs = require('fs');
var path = require('path');
var io = require('socket.io').http;

var privateKey = fs.readFileSync('/home/ssl/server.key').toString();
var certificate = fs.readFileSync('/home/ssl/server.crt').toString();

var server = https.createServer({key:privateKey,cert:certificate},app);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(4000, function(){
  console.log('listening on *:4000');
});
