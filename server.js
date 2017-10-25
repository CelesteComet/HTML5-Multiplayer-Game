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

require('./server/Entity');
require('./server/Player');
require('./server/AirStubby');
require('./server/Bubble');
require('./server/Bullet');
require('./server/ExplodingStubby');



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
  debugger;
  var pack = {
    bullets: Bullet.update(),
    players: Player.update(),
    airStubbys: AirStubby.update(),
    bubbles: Bubble.update(),
    spriteEffects: ExplodingStubby.update()
  }
  var total = 0;
  for(var i in pack) {
    total += pack[i].length;
  }
 // console.log(total);
  
  for(var i in SOCKET_LIST) {
    var socket = SOCKET_LIST[i];
    socket.emit('newPosition', pack);
  }
}, 1000/60);




