var Entity = require('./Entity');

var AirStubby = function() {
  var self = Entity();
  self.id = Math.random();
  self.x = Math.random() * 500;
  self.y = 0;
  self.vX = 0
  self.vY = +1;
  self.timer = 20;
  self.toRemove = false;
  self.lifeTime = 500;

  var super_update = self.update;
  self.update = function() {
    super_update();
    if(self.timer++ > self.lifeTime) {
      self.toRemove = true;
    }
  }

  AirStubby.list[self.id] = self;
  return self;
}

AirStubby.list = {};

AirStubby.update = function() {
  var pack = [];
  if (Math.random() < 0.1) {
    AirStubby();
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
      drawWidth: stubby.drawWidth,
      drawHeight: stubby.drawHeight
    })
  }
  return pack;
}

module.exports = AirStubby;