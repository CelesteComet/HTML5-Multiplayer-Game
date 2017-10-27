Bullet = function(angle, owner) {
  var self = Entity.create();
  self.id = Math.random();
  self.scale = .5;
  self.width = 10;//17 * self.scale;
  self.height = 20;//40 * self.scale;
  self.bulletSpeed = 20;
  self.damage = 5;
  self.owner = owner;
  self.rotation = owner.rotation;
  self.vX = Math.cos(angle/180*Math.PI) * self.bulletSpeed;
  self.vY = Math.sin(angle/180*Math.PI) * self.bulletSpeed;
  self.toRemove = false;


  self.lifeTime = 50;
  

  var super_update = self.update.bind(self)
  self.update = function() {
    if(self.tick++ > self.lifeTime) {
      self.toRemove = true;
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

