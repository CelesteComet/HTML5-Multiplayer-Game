var math = require('./math')();

Player = function(id) {
  var self = Entity();
  self.id = id;
  self.number = "" + Math.floor(10 * Math.random());

  // Size
  self.width = 110;
  self.height = 110;
  self.drawWidth = 110;
  self.drawHeight = 110;
  self.radius = Math.sqrt( (self.width/2 * self.width/2) + (self.height/2 * self.height/2) )

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
  self.fireRate = 1.5;

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
/*
    var gunOffset = 1.9;
    this.hX = this.x + this.hitBoxWidth/2;
    this.hY = this.y + this.hitBoxHeight/2;
    var vX = Math.sin((this.rotation) * Math.PI / 180);
    var vY = -Math.cos((this.rotation) * Math.PI / 180);
    var rotation = this.rotation;
    var crotation = this.rotation + 225;
    var rads = degreesToRadians(crotation);
    var centerX = this.x + this.width/2;
    var centerY = this.y + this.height/2;
    var radius = Math.sqrt( (this.width/2/gunOffset * this.width/2/gunOffset) + (this.height/2/gunOffset * this.height/2/gunOffset) ) 
    var gunX = radius * Math.cos(rads) + centerX;
    var gunY = radius * Math.sin(rads) + centerY; 

    
    var jrotation = this.rotation + 300;
    var jrads = degreesToRadians(jrotation);
    
    
    var jradius = Math.sqrt( (this.width/2/gunOffset * this.width/2/gunOffset) + (this.height/2/gunOffset * this.height/2/gunOffset) ) 
    var gunX2 = jradius * Math.cos(jrads) + centerX;
    var gunY2 = jradius * Math.sin(jrads) + centerY; 
*/
  self.shootBullet = function(angle) {
    
    var radian = math.degreeToRadian(angle + 315);
    var radian2 = math.degreeToRadian(angle + 45);
    
    var centerX = self.x + self.width/2;
    var centerY = self.y + self.height/2;

    var gunOffset = 3;
    

   // var radius = Math.sqrt( Math.pow(self.width/2/gunOffset, 2) + Math.pow(self.height/2/gunOffset, 2) )
    var radius = Math.sqrt( (self.width/2/gunOffset * self.width/2/gunOffset) + (self.height/2/gunOffset * self.height/2/gunOffset) )
    var b = Bullet(angle, self);
    b.x = (radius) * Math.cos(radian) + centerX - b.width/2;
    b.y = (radius) * Math.sin(radian) + centerY - b.height/2; 

    var b2 = Bullet(angle,self);
    b2.x = (radius) * Math.cos(radian2) + centerX - b.width/2;
    b2.y = (radius) * Math.sin(radian2) + centerY - b.height/2; 
  }

  Player.list[id] = self;
  return self;
}

Player.list = {};

Player.getRandomPlayer = function() {
  if(Object.keys(Player.list).length > 0) {
    var players = []
    for(id in Player.list) {
      players.push(Player.list[id]);
    }
    return players[math.getRandomNumberBetween(0, players.length - 1)];
  }
  return null; 
}

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
      number: player.number,
      radius: player.radius
    })
  }
  return pack;
}

