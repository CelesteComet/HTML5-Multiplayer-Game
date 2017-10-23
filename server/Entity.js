var Entity = function() {
  var self = {
    id: "",
    x: 250,
    y: 250,
    drawWidth: 50,
    drawHeight: 50,
    vX: 0,
    vY: 0
  }

  self.update = function() {
    self.updatePosition();
  }

  self.updatePosition = function() {
    self.x += self.vX;
    self.y += self.vY;
  }

  return self;
}


module.exports = Entity;