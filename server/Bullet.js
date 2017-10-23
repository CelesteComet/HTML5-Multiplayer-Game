var Entity = require('./Entity');
var AirStubby = require('./AirStubby');

var Bullet = function(angle) {
  var self = Entity();
  self.id = Math.random();
  self.width = 5;
  self.height = 5;
  self.vX = Math.cos(angle/180*Math.PI) * 10;
  self.vY = Math.sin(angle/180*Math.PI) * 10;
  self.timer = 0;
  self.toRemove = false;
  self.lifeTime = 50;

  var super_update = self.update;
  self.update = function() {
    if(self.timer++ > self.lifeTime) {
      self.toRemove = true;
    }

    // Check all AirStubbys for collision
    for(var i in AirStubby.list) {
      var stubby = AirStubby.list[i];
      if(self.collide(stubby)) {
        self.toRemove = true;
        stubby.toRemove = true;
      }
    }
    super_update();
  }

  Bullet.list[self.id] = self;
  return self;
}

Bullet.list = {};

Bullet.update = function() {
  var pack = [];

  for(var i in Bullet.list) {
    var bullet = Bullet.list[i];
    bullet.update();
    if(bullet.toRemove) {
      delete Bullet.list[i];
    }
    pack.push({
      x: bullet.x,
      y: bullet.y
    })
  }
  return pack;
}

module.exports = Bullet;