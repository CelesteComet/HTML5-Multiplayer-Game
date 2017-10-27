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

viewPort = {
  height: 700,
  width: 1000
}



_Entity = require('./server/Entity');
_Player = require('./server/Player');
Entity = new _Entity();
Player = new _Player();
require('./server/AirStubby');
require('./server/Bubble');
require('./server/Bullet');
require('./server/ExplodingStubby');
require('./server/Cloud');




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




var lastUpdateTime = (new Date()).getTime();
setInterval(function() {
  var currentTime = (new Date()).getTime();
  var dt = currentTime - lastUpdateTime;
  var pack = {
    bullets: Bullet.update(dt),
    players: Player.update(dt),
    airStubbys: AirStubby.update(dt),
    bubbles: Bubble.update(dt),
    spriteEffects: ExplodingStubby.update(dt),
    clouds: Cloud.update(dt)
  }
  /*
  var total = 0;
  for(var i in pack) {
    total += pack[i].length;
  }
  */
 // console.log(total);

  for(var i in SOCKET_LIST) {
    var socket = SOCKET_LIST[i];
    socket.emit('newPosition', pack);
  }
}, 1000/60);




