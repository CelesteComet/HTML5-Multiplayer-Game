var math = require('./math')();
var patterns = {

  fourSwoopDown: function() {
    var swoopTime = 30;
    var a = AirStubby();
    var b = AirStubby();
    var c = AirStubby();
    var d = AirStubby();

    a.addMove(0, 4, swoopTime);
    a.stop()
    b.addMove(0, 4, swoopTime - 20);
    b.stop()
    c.addMove(0, 4, swoopTime - 20);
    c.stop()
    d.addMove(0, 4, swoopTime);
    d.stop();
  },

  topInCircleAround: function() {
    var radius = 350;
    var a = AirStubby();
    var xSpeed = 0;
    var ySpeed = 3;
    var t = 20;
    a.x = 475;
    a.y = -100;
    a.addMove(-xSpeed, ySpeed, t)
    a.stop();
    a.addModifier(function(target){
      target.vX = 1;
      target.vY += 2;
    }, 1)
  },


  circleAround: function() {
    patterns.topInCircleAround();

  }


}



module.exports = patterns;