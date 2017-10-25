var math = require('./math')();

Cloud = function() {
  var self = Entity();

  var super_update = self.update;
  self.update = function() {
    super_update();
    self.y += 5;
  }

  Cloud.list[self.id] = self;
  return self;
}

Cloud.list = {};

Cloud.update = function() {
  if (Math.random() < 0.02) {
    //var newCloud = Cloud();
    //newCloud.y = -600;
    //newCloud.x = math.getRandomNumberBetween(0,1000);
  }
  var pack = [];
  for(i in Cloud.list) {
    var c = Cloud.list[i];
    if (c.toRemove) {
      delete Cloud.list[i];
    }
    c.update();
    pack.push({
      x: c.x,
      y: c.y
    })
  }
  return pack;
}

