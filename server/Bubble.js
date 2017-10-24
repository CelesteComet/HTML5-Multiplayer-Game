Bubble = function(angle) {
  var self = Entity();
  self.id = Math.random();
  self.radius = 25.6;
  self.damage = 10;
  self.lifeTime = 1000;
  self.toRemove = false;
  self.speed = 5;
  self.vX = Math.cos(angle/180*Math.PI) * self.speed;
  self.vY = Math.sin(angle/180*Math.PI) * self.speed;

  var super_update = self.update;
  self.update = function() {
    self.tick++;
    if(self.tick > self.lifeTime) {
      self.toRemove = true;
    }
    super_update();
  }

  Bubble.list[self.id] = self;
  return self;
}

Bubble.list = {};

Bubble.update = function() {
  var pack = [];

  for(var i in Bubble.list) {
    var bubble = Bubble.list[i];
    bubble.update();
    if(bubble.toRemove) {
      delete this.list[i];
    }
    pack.push({
      x: bubble.x,
      y: bubble.y
    })
  }
  return pack;
}



