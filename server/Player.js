var math = require('./math')();

function Player() {

  this.list = {};
  this.create = function() {

    i = Entity.create();


    // size
    i.width = 110;
    i.height = 110;
    i.drawWidth = 110;
    i.drawHeight = 110;
    i.radius = Math.sqrt( (i.width/2 * i.width/2) + (i.height/2 * i.height/2) );

    // rotation and fire
    i.rotation = 0;
    i.rotationSpeed = 4;
    i.fireRate = 4;
    i.maxSpeed = 10;
    i.friction = 0.9;

    // controls

    i.pressingRight = false;
    i.pressingLeft = false;
    i.pressingUp = false;
    i.pressingDown = false;
    i.pressingSpace = false;
    i.pressingA = false;
    i.pressingD = false;

    var super_update = i.update.bind(i)

    i.update = function() {
      if(this.pressingA) {
        this.rotation -= 1 * this.rotationSpeed;
      }

      if(this.pressingD) {
        this.rotation += 1 * this.rotationSpeed;
      }

      if(this.rotation % 360 == 0) {
        this.rotation = 0;
      }

      if(this.pressingSpace && this.tick % this.fireRate == 0) {
        this.shootBullet(this.rotation + 270); // to shoot up
      }
      this.updateSpeed();
      super_update();
    }
    
    i.updateSpeed = function() {
      if(this.pressingRight && this.vX < this.maxSpeed) { 
        this.vX++;
      } else if(this.pressingLeft && this.vX < this.maxSpeed) {
        this.vX--;
      } else {
        //this.vX = 0;
      }

      if(this.pressingUp && this.vY < this.maxSpeed) { 
        this.vY--
      } else if(this.pressingDown && this.vY < this.maxSpeed) {
        this.vY++;
      } 
    }



    i.shootBullet = function(angle) {

      var radian = math.degreeToRadian(angle + 315);
      var radian2 = math.degreeToRadian(angle + 45);
      
      var centerX = this.x + this.width/2;
      var centerY = this.y + this.height/2;

      var gunOffset = 3;
      
      // var radius = Math.sqrt( Math.pow(this.width/2/gunOffset, 2) + Math.pow(this.height/2/gunOffset, 2) )
      var radius = Math.sqrt( (this.width/2/gunOffset * this.width/2/gunOffset) + (this.height/2/gunOffset * this.height/2/gunOffset) )
      var b = Bullet(angle, this);
      b.x = (radius) * Math.cos(radian) + centerX - b.width/2;
      b.y = (radius) * Math.sin(radian) + centerY - b.height/2; 

      var b2 = Bullet(angle,this);
      b2.x = (radius) * Math.cos(radian2) + centerX - b.width/2;
      b2.y = (radius) * Math.sin(radian2) + centerY - b.height/2; 
    }



    //this.list[i.id] = i;
    return i;
  }

  this.update = function() {
    var pack = [];
    for(var i in this.list) {
      var player = this.list[i];
      player.update();
      pack.push({
        x: player.x,
        y: player.y,
        drawWidth: player.drawWidth,
        drawHeight: player.drawHeight,
        rotation: player.rotation,
        radius: player.radius
      })
    }
    
    return pack;
  }

  this.onConnect = function(socket) {

    var player = this.create();
    this.list[socket.id] = player;

    // Begin the starting move into the game

    player.x = 500;
    player.y = 600;

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

  this.onDisconnect = function(socket) {
    delete this.list[socket.id];
  }

  this.getRandomPlayer = function() {
    if(Object.keys(this.list).length > 0) {
      var players = []
      for(i in this.list) {
        players.push(this.list[i]);
      }
      return players[math.getRandomNumberBetween(0, players.length - 1)];
    }
    return null; 
  }
}
/*
Player = function(this) {
    var this = Entity.create();
    this.this = this;
    this.number = "" + Math.floor(10 * Math.random());

  // Size
    this.width = 110;
    this.height = 110;
    this.drawwidth = 110;
    this.drawHeight = 110;
    this.radius = Math.sqrt( (this.width/2 * this.width/2) + (this.height/2 * this.height/2) )

  // Controls
    this.pressingRight = false;
    this.pressingLeft = false;
    this.pressingUp = false;
    this.pressingDown = false;
    this.pressingSpace = false;
    this.pressingA = false;
    this.pressingD = false;

    this.rotation = 0;
    this.rotationSpeed = 5;
    this.maxSpeed = 10;
    this.fireRate = 1.5;

    var super_update = this.update.bind(this)
    this.update = function() {
      this.tick++;
      this.updateSpeed();
    super_update();

      if(this.pressingA) {
        this.rotation -= 1 * this.rotationSpeed;
    }

      if(this.pressingD) {
        this.rotation += 1 * this.rotationSpeed;
    }

      if(this.rotation % 360 == 0) {
        this.rotation = 0;
    }

      if(this.pressingSpace && this.tick % this.fireRate == 0) {
        this.shootBullet(this.rotation + 270); // to shoot up
    }
    }.bind(this);

    this.updateSpeed = function() {
      if(this.pressingRight) { 
        this.vX = this.maxSpeed; 
      } else if(this.pressingLeft) {
        this.vX = -this.maxSpeed;
      } else if(this.moves.length <= 0) {
        this.vX = 0;
    }

      if(this.pressingUp) { 
        this.vY = -this.maxSpeed; 
      } else if(this.pressingDown) {
        this.vY = this.maxSpeed;
      } else if(this.moves.length <= 0) {
        this.vY = 0;
    }
  }
*/
/*
    var gunOffset = 1.9;
    this.hX = this.x + this.hitBoxwidth/2;
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
/*
    this.shootBullet = function(angle) {
    
    var radian = math.degreeToRadian(angle + 315);
    var radian2 = math.degreeToRadian(angle + 45);
    
      var centerX = this.x + this.width/2;
      var centerY = this.y + this.height/2;

    var gunOffset = 3;
    

     // var radius = Math.sqrt( Math.pow(this.width/2/gunOffset, 2) + Math.pow(this.height/2/gunOffset, 2) )
      var radius = Math.sqrt( (this.width/2/gunOffset * this.width/2/gunOffset) + (this.height/2/gunOffset * this.height/2/gunOffset) )
      var b = Bullet(angle, this);
    b.x = (radius) * Math.cos(radian) + centerX - b.width/2;
    b.y = (radius) * Math.sin(radian) + centerY - b.height/2; 

      var b2 = Bullet(angle,this);
    b2.x = (radius) * Math.cos(radian2) + centerX - b.width/2;
    b2.y = (radius) * Math.sin(radian2) + centerY - b.height/2; 
  }

    Player.list[this] = this;
    return this;
}

Player.list = {};

Player.getRandomPlayer = function() {
  if(Object.keys(Player.list).length > 0) {
    var players = []
    for(this in Player.list) {
      players.push(Player.list[this]);
    }
    return players[math.getRandomNumberBetween(0, players.length - 1)];
  }
  return null; 
}

Player.onConnect = function(socket) {
  var player = Player(socket.this);
  // Begin the starting move into the game

  player.x = viewPort.width/2 - player.drawwidth/2;
  player.y = 600;
  player.addMove(0, -4, 150);
  player.stop();
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
  delete Player.list[socket.this];
}

Player.update = function() {
  var pack = [];

  for(var i in Player.list) {
    var player = Player.list[i];
    player.update();
    pack.push({
      x: player.x,
      y: player.y,
      drawwidth: player.drawwidth,
      drawHeight: player.drawHeight,
      rotation: player.rotation,
      number: player.number,
      radius: player.radius
    })
  }
  return pack;
}
*/

module.exports = Player;

