var math = function() {
  var self = {};
  self.angleBetweenTwoPoints = function(p1, p2, radians) {
    if (radians) {
      return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    } 
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
  }
  return self;
}

module.exports = math;