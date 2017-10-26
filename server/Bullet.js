Bullet = function(angle, owner) {
  var self = Entity();
  self.id = Math.random();
  self.scale = .5;
  self.width = 10;//17 * self.scale;
  self.height = 20;//40 * self.scale;
  self.bulletSpeed = 20;
  self.damage = 30;
  self.owner = owner;
  self.rotation = owner.rotation;
  self.vX = Math.cos(angle/180*Math.PI) * self.bulletSpeed;
  self.vY = Math.sin(angle/180*Math.PI) * self.bulletSpeed;
  self.toRemove = false;


  self.lifeTime = 50;
  

  var super_update = self.update;
  self.update = function() {
    if(self.tick++ > self.lifeTime) {
      self.toRemove = true;
    }

    // Check all AirStubbys for collision
    for(var i in AirStubby.list) {
      var stubby = AirStubby.list[i];
      if(self.collide(stubby)) {
        self.toRemove = true;
        ExplodingStubby(self.x + Math.random() * 2, self.y + Math.random() * 2, 'bulletHit');
        stubby.gotHitBy(self);
      }
    }

    // Check all Bubbles for collision
    for(var i in Bubble.list) {
      var bubble = Bubble.list[i];
      var rect = {x: self.x, y: self.y, w: this.width, h: this.height};
      var circle = {x: bubble.x, y: bubble.y, r: bubble.radius}
      if(self.rectCircleCollision(rect, circle)) {
        self.toRemove = true;
        bubble.toRemove = true;
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
      y: bullet.y,
      width: bullet.width,
      height: bullet.height,
      rotation: bullet.rotation
    })
  }
  return pack;
}

