Player = function(id) {
  var self = Entity();
  self.id = id;
  self.number = "" + Math.floor(10 * Math.random());

  // Size
  self.drawWidth = 110;
  self.drawHeight = 110;

  // Controls
  self.pressingRight = false;
  self.pressingLeft = false;
  self.pressingUp = false;
  self.pressingDown = false;
  self.pressingSpace = false;
  self.pressingA = false;
  self.pressingD = false;

  self.rotation = 0;
  self.rotationSpeed = 5;
  self.maxSpeed = 10;
  self.fireRate = 2;

  var super_update = self.update;
  self.update = function() {
    self.tick++;
    self.updateSpeed();
    super_update();

    if(self.pressingA) {
      self.rotation -= 1 * self.rotationSpeed;
    }

    if(self.pressingD) {
      self.rotation += 1 * self.rotationSpeed;
    }

    if(self.rotation % 360 == 0) {
      self.rotation = 0;
    }

    if(self.pressingSpace && self.tick % self.fireRate == 0) {
      self.shootBullet(self.rotation + 270); // to shoot up
    }
  }

  self.updateSpeed = function() {
    if(self.pressingRight) { 
      self.vX = self.maxSpeed; 
    } else if(self.pressingLeft) {
      self.vX = -self.maxSpeed;
    } else {
      self.vX = 0;
    }

    if(self.pressingUp) { 
      self.vY = -self.maxSpeed; 
    } else if(self.pressingDown) {
      self.vY = self.maxSpeed;
    } else {
      self.vY = 0;
    }
  }

  self.shootBullet = function(angle) {
    var b = Bullet(angle, self);
    b.x = self.x;
    b.y = self.y;
  }

  Player.list[id] = self;
  return self;
}

Player.list = {};

Player.onConnect = function(socket) {
  var player = Player(socket.id);
  socket.on('keyPress', function(data) {
    if(data.input == 'right') { player.pressingRight = data.state; }
    if(data.input == 'left')  { player.pressingLeft  = data.state; }
    if(data.input == 'up')    { player.pressingUp    = data.state; }
    if(data.input == 'down')  { player.pressingDown  = data.state; }
    if(data.input == 'space') { player.pressingSpace  = data.state; }
    if(data.input == 'A')  { player.pressingA  = data.state; }
    if(data.input == 'D')  { player.pressingD  = data.state; }
  })
}

Player.onDisconnect = function(socket) {
  delete Player.list[socket.id];
}

Player.update = function() {
  var pack = [];

  for(var i in Player.list) {
    var player = Player.list[i];
    player.update();
    pack.push({
      x: player.x,
      y: player.y,
      drawWidth: player.drawWidth,
      drawHeight: player.drawHeight,
      rotation: player.rotation,
      number: player.number
    })
  }
  return pack;
}

