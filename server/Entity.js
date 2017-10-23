var Entity = function() {
  var self = {
    id: "",
    x: 250,
    y: 250,
    drawWidth: 50,
    drawHeight: 50,
    vX: 0,
    vY: 0,
    tick: 0
  }

  self.update = function() {
    self.updatePosition();
  }

  self.updatePosition = function() {
    self.x += self.vX;
    self.y += self.vY;
  }

  self.getDistance = function(pt) {
    return Math.sqrt(Math.pow(self.x,- pt.x,2) + Math.pow(self.y-pt.y,2));
  }

  self.collide = function(object2) {
    if (self.x < object2.x + object2.width  && self.x + self.width  > object2.x &&
        self.y < object2.y + object2.height && self.y + self.height > object2.y) {
      return true;
    }
    return false;
  }

  return self;
}


module.exports = Entity;