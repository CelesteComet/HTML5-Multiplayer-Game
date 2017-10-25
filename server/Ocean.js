

Ocean = function() {
  var self = Entity();
  self.scrollSpeed = 1;
  self.width = 3840/3;
  self.height = 4320/3;
  self.y = -self.height;
  Ocean.list[self.id] = self;

  var super_update = self.update;
  self.update = function() {
    super_update();
    
    if(self.y == 0) {
      self.toRemove = true;
      Ocean();

    }
    self.y += self.scrollSpeed;
  }

  return self;


}

Ocean.list = {};

Ocean.update = function() {
  var pack = [];
  for(var i in Ocean.list) {
    var o = Ocean.list[i];
    o.update();
    if(o.toRemove) {
      delete Ocean.list[i]
    }
    pack.push({
      x: o.x,
      y: o.y,
      width: o.width,
      height: o.height
      // let client handle width and height
    })
  }
  return pack;
}

Ocean();



