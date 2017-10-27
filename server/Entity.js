function Entity() {
  this.create = function() {
    var instance = {
      id: Math.random(),
      x: 0,
      y: 0,
      vX: 0,
      vY: 0,
      friction: 1,
      width: 50,
      height: 50,
      drawWidth: 50,
      drawHeight: 50,
      tick: 0,
      lifeTime: 300,
      moves: [],
      modifier: null,
      moveLife: 0,
      modifierTick: 0,
      toRemove: false
    }

    instance.update = function() {

      this.tick++;
      instance.moveLife--;

      
      var newMove = null;
      if(this.moveLife < 0 && this.moves) {
          newMove = this.moves.shift();
      } 

      this.updatePosition(newMove, this.modifier);
      

      if(this.tick > this.lifeTime) {
        this.toRemove = true;
      }
    }


    instance.updatePosition = function(move, modifier) {

      if(move) {
        this.vX = move.vX;
        this.vY = move.vY;
        this.moveLife = move.t;
      } else if (modifier && this.moveLife < 0) {
        if(this.tick % this.modifierTime == 0) {
          this.modifierTick++;
        }
        modifier(this);
      }

      this.vX *= this.friction;
      this.vY *= this.friction;

      this.x += this.vX;
      this.y += this.vY;
    }


    instance.getDistance = function(pt) {
      return Math.sqrt(Math.pow(self.x,- pt.x,2) + Math.pow(self.y-pt.y,2));
    }

    instance.collide = function(object2) {
      var self = this;
      if (self.x < object2.x + object2.width  && self.x + self.width  > object2.x &&
          self.y < object2.y + object2.height && self.y + self.height > object2.y) {
        return true;
      }
      return false;
    }

    instance.rectCircleCollision = function(rect, circle) {
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

    instance.addMove = function(vX, vY, t) {
      this.moves.push({
        vX,
        vY,
        t
      })   
    }

    instance.stop = function() {
      this.moves.push({
        vX: 0,
        vY: 0,
        t: 0
      })
      this.modifier = null;
      this.modifierTick = 0;
    }

    instance.addModifier = function(modifier, modifierTime) {
      this.modifier = modifier;
      this.modifierTime = modifierTime;
    }

    return instance;
  }
}

module.exports = Entity;




