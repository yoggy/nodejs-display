// npm install express
// npm install socket.io

// config
PORT = 8080;

var util = require('util');
var express = require('express');

// express
var app = express.createServer();
app.configure(function() {
  app.use(express.static(__dirname + '/public'));
});
app.listen(PORT)

// socket.io
io = require('socket.io').listen(app);
io.sockets.on('connection', function(s) {
  s.on('keypress', function(data) {
    console.log("keypress:" + data);
    s.broadcast.emit('keypress', data);
  });

  s.on('backspace', function(data) {
    console.log("backspace:" + data);
    s.broadcast.emit('backspace', data);
  });

  s.on('command', function(data) {
    console.log("command:" + data);

    var local = false;
    var cmd = data;
    if (cmd.substr(0,6) == "local:") {
      cmd = cmd.substr(6);
      local = true;
    }

    if (local == true) {
      s.broadcast.emit('command', {command: "clear_command()"})
    }
    else {
      s.broadcast.emit('command', {command: data});
    }
    s.emit('command', {command: data});
  });
});


