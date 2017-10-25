Entity = function() {
  var self = {
    id: Math.random(),
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    drawWidth: 50,
    drawHeight: 50,
    vX: 0,
    vY: 0,
    tick: 0,
    lifeTime: 500
  }

  self.update = function() {
    self.tick++;
    self.updatePosition();
    if(self.tick > self.lifeTime) {
      self.toRemove = true;
    }
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


  //var circle={x:100,y:290,r:10};
  //var rect={x:100,y:100,w:40,h:100};

  self.rectCircleCollision = function(rect, circle) {
    var distX = Math.abs(circle.x - rect.x-rect.w/2);
    var distY = Math.abs(circle.y - rect.y-rect.h/2);

    if (distX > (rect.w/2 + circle.r)) { return false; }
    if (distY > (rect.h/2 + circle.r)) { return false; }

    if (distX <= (rect.w/2)) { return true; } 
    if (distY <= (rect.h/2)) { return true; }

    var dx=distX-rect.w/2;
    var dy=distY-rect.h/2;
    return (dx*dx+dy*dy<=(circle.r*circle.r));
  }



  return self;
}


