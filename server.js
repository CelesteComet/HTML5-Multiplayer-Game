var port = process.env.PORT || 3000,
    UUID = require('node-uuid'),
    express = require('express'),
    app = express(),
    server = require('http').Server(app);

app.use(express.static('client'))
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
})

server.listen(port, function() {
  console.log(`Server listening on port ${port}`);
})

// Socket IO

var SOCKET_LIST = {};
var PLAYER_LIST = {};

var Entity = require('./server/Entity');
var Player = require('./server/Player');
var Bullet = require('./server/Bullet');
var AirStubby = require('./server/AirStubby');


var sio = require('socket.io').listen(server)

sio.sockets.on('connection', function(socket) {
  socket.id = UUID();
  SOCKET_LIST[socket.id] = socket;

  Player.onConnect(socket);

  socket.on('disconnect', function() {
    delete SOCKET_LIST[socket.id];
    Player.onDisconnect(socket);
  })


})



setInterval(function() {

  var pack = {
    players: Player.update(),
    bullets: Bullet.update(),
    airStubbys: AirStubby.update()
  }

  
  for(var i in SOCKET_LIST) {
    var socket = SOCKET_LIST[i];
    socket.emit('newPosition', pack);
  }
}, 1000/60);




