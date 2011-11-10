// socket.io connection
var conn;

// swf object
var swf;

function init_swf() {
  swf = $("#swf")[0];
}

function reload() {
  location.reload();
}

function get_command() {
  return $('#command').attr('value');
}

function set_command(str) {
  $('#command').attr('value', str);
}

function clear_command() {
  $('#command').attr('value', '');
}

function init() {
  // for swf object
  init_swf();

  // sockeet.io
  conn = io.connect('http://' + location.hostname + ':8080/');

  conn.on('keypress', function(data) {
    console.log("keypress:" + data);
    set_command(get_command() + String.fromCharCode(data));
  });

  conn.on('backspace', function(data) {
    console.log("backspace:" + data);
    var cmd = get_command();
    if (cmd.length == 0) return;
    cmd = cmd.substr(0, cmd.length-1);
    set_command(cmd);
  });

  conn.on('command', function(data) {
    eval(data.command);
    clear_command();
  });

  // keypress
  $('#command').keypress(function(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    
    if (code == 13) {
      conn.emit('command', get_command());
    }
    else {
      conn.emit('keypress', code);
    }
  });
  $('#command').keydown(function(e) {
    if (e.keyCode == 8) {
      conn.emit('backspace', e.keyCode);
    }
  }); 
}

$(document).ready(init);

