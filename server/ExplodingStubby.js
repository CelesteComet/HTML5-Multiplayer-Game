var math = require('./math')();


SpriteEffect = function(x, y) {
  var self = {
    id: Math.random(),
    x: x,
    y: y,
    vX: 0,
    vY: 0,
    img: "",
    width: 20,
    height: 20,
    tick: 0,
    toRemove: false,
    animationFrame: 0,
    animationSpeed: 3,
    animationFrameLength: 10,
    sound: false
  };

  self.update = function() {
    self.tick++;
    self.x += self.vX;
    self.y += self.vY;
    if(self.tick == 1) { self.sound = true} else { self.sound = false}
    if(self.animationFrame > self.animationFrameLength) {
      self.toRemove = true;
    }
    if(self.tick % self.animationSpeed == 0) {
      self.animationFrame++;
    }
  }

  return self;
}

ExplodingStubby = function(x, y, effectName) {
  var self = SpriteEffect(x, y);
  self.effect = ExplodingStubby.effects[effectName];
  var {animationFrame, animationFrameLength, animationSpeed, width, height, image, name, update} = self.effect;
  self.e = math.getRandomNegativePositive(-10,10);
  self.f = math.getRandomNegativePositive(-10,10);
  self.animationFrame = animationFrame; 
  self.animationFrameLength = animationFrameLength;
  self.animationSpeed = animationSpeed;
  self.width = width;
  self.height = height;
  self.image = image;
  self.name = name;

  var super_update = self.update;
  self.update = function() {
    if(update) {
      update(self);
    }
    super_update();
  }

  // Dictionary to hold effect properties
  
  ExplodingStubby.list[self.id] = self
  return self;
}

ExplodingStubby.effects = {};
ExplodingStubby.list = {};

ExplodingStubby.addEffect = function(effect) {
  ExplodingStubby.effects[effect.name] = effect;
}

ExplodingStubby.update = function() {
  var pack = [];
  for(var i in ExplodingStubby.list) {
    var es = ExplodingStubby.list[i];
    es.update();
    if(es.toRemove) {
      delete ExplodingStubby.list[i];
    }
    pack.push({
      x: es.x,
      y: es.y,
      width: es.width,
      height: es.height,
      animationFrame: es.animationFrame,
      image: es.image,
      name: es.name,
      sound: es.sound
    })
  }
  return pack;
}

var explodingStubbyEffect = {
  name: 'miniufo',
  image: 'miniufo.png',
  animationFrame: 15,
  animationFrameLength: 35,
  animationSpeed: 3,
  width: 95,
  height: 76 + 20,
  update: function(self) {
    self.y += 5;
  }
}

var bulletHitEffect = {
  name: 'bulletHit',
  image: 'bulletHit.png',
  animationFrame: 0,
  animationFrameLength: 16,
  animationSpeed: 1,
  width: 100,
  height: 100
}


var smallExplosionEffect = {
  name: 'explosion',
  image: 'explosion.png',
  animationFrame: 0,
  animationFrameLength: 14,
  animationSpeed: 2,
  width: 100,
  height: 100,
  update: function(self) {
    self.y += self.e;
    self.x += self.f;
  }
}



ExplodingStubby.addEffect(explodingStubbyEffect);
ExplodingStubby.addEffect(bulletHitEffect);
ExplodingStubby.addEffect(smallExplosionEffect);



