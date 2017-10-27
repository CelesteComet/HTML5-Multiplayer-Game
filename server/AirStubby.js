var math = require('./math')();
var patterns = require('./patterns');

AirStubby = function() {
  var self = Entity.create();
  self.id = Math.random();
  self.x = Math.random() * 500;
  self.y = 0;
  self.scale = 2;
  self.drawWidth = 44 * self.scale;
  self.drawHeight = 38 * self.scale;
  self.width = self.drawWidth;
  self.height = self.drawHeight;
  self.vX = 0
  self.vY = 1.5;
  self.tick = 0;
  self.toRemove = false;
  self.lifeTime = 1000;
  self.showHealthBar = false;
  self.health = 100;
  self.animationFrame = 0;
  self.animationFrameLength = 15;
  self.animationSpeed = 8;



  var super_update = self.update.bind(self);
  self.update = function() {

    super_update();

    // animation
    if(self.tick % self.animationSpeed == 0) {
      self.animationFrame++;
    }


    if(self.animationFrame > self.animationFrameLength) {
      self.animationFrame = 0;
    }

    // lifetime
    if(self.tick > self.lifeTime) {
      self.toRemove = true;
    }

    // Check all AirStubbys for collision
    for(var i in Bullet.list) {
      var b = Bullet.list[i];
      if(self.collide(b)) {
        ExplodingStubby(b.x + Math.random() * 5, b.y + Math.random() * 5, 'bulletHit');
        b.toRemove = true;
        self.gotHitBy(b);
      }
    }

    var canFire = self.tick % 10 == 0;
    var gunOffset = 18;
    if(canFire) {

      var p = Player.getRandomPlayer();
      if(p) {
        var angle = math.angleBetweenTwoPoints({x: self.x, y: self.y}, {x: p.x, y: p.y});
        var b = Bubble(angle);
        if(Math.random() < 0.2) {
          b.unbreakable = true;
        }
        b.x = self.x + self.width/2 - gunOffset;
        b.y = self.y + self.height;
      }
    }
  }

  self.gotHitBy = function(ammoType) {
    self.showHealthBar = true;
    self.health -= ammoType.damage;
    if(self.health <= 0) { 
      self.showHealthBar = false;
      self.toRemove = true 
      ExplodingStubby(self.x, self.y, 'miniufo');
      ExplodingStubby(self.x, self.y, 'explosion');
      ExplodingStubby(self.x, self.y, 'explosion');
      ExplodingStubby(self.x, self.y, 'explosion');
    }
  }

  

  AirStubby.list[self.id] = self;


  return self;
}

AirStubby.tick = 0;

AirStubby.list = {};

AirStubby.update = function() {
  AirStubby.tick++;
  var pack = [];
  if(Object.keys(AirStubby.list).length == 0) {//Object.keys(AirStubby.list).length == 0) {
    patterns.fourSwoopDown();
    patterns.fourSwoopDown();

  }
  for(var i in AirStubby.list) {
    var stubby = AirStubby.list[i];
    stubby.update();
    if(stubby.toRemove) {
      delete AirStubby.list[i];
    }
    pack.push({
      x: stubby.x,
      y: stubby.y,
      width: stubby.width,
      height: stubby.height,
      drawWidth: stubby.drawWidth,
      drawHeight: stubby.drawHeight,
      showHealthBar: stubby.showHealthBar,
      health: stubby.health,
      animationFrame: stubby.animationFrame
    })
  }
  return pack;
}

