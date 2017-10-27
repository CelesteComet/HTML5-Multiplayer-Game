

Bubble = function(angle) {
  var self = Entity.create();
  self.id = Math.random();
  self.radius = 25.6;
  self.damage = 10;
  self.lifeTime = 400;
  self.toRemove = false;
  self.speed = 3;
  self.vX = Math.cos(angle/180*Math.PI) * self.speed;
  self.vY = Math.sin(angle/180*Math.PI) * self.speed;
  self.animationFrame = 0;
  self.animationFrameLength = 49;
  self.sound = false;
  self.unbreakable = false;

  var super_update = self.update.bind(self);
  self.update = function() {

    // update animation
    if(self.animationFrame == self.animationFrameLength - 1) {
      self.animationFrame = 0;
    }

    if(self.tick == 1) { self.sound = true} else { self.sound = false}

    self.animationFrame += 1;

    if(self.tick > self.lifeTime) {
      self.toRemove = true;
    }

    // Check all Bubbles for collision
    for(var i in Bullet.list) {
      var bullet = Bullet.list[i];
      var rect = {x: bullet.x, y: bullet.y, w: bullet.width, h: bullet.height};
      var circle = {x: self.x, y: self.y, r: self.radius}
      if(self.rectCircleCollision(rect, circle)) {
        if(!self.unbreakable) {
          self.toRemove = true;
          ExplodingStubby(self.x - self.width/2, self.y - self.height/2, 'bubblePuff');
          bullet.toRemove = true;
        } 
      }
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
      delete Bubble.list[i];
    }
    pack.push({
      x: bubble.x,
      y: bubble.y,
      animationFrame: bubble.animationFrame,
      sound: bubble.sound,
      radius: bubble.radius,
      unbreakable: bubble.unbreakable
    })
  }
  return pack;
}



