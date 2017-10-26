var math = function() {
  var self = {};
  self.angleBetweenTwoPoints = function(p1, p2, radians) {
    if (radians) {
      return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    } 
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
  }

  self.getRandomNumberBetween = function(min, max) {
    var min = Math.ceil(min);
    var max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  self.getRandomNegativePositive = function(min, max) {
    var num = Math.floor(Math.random()*min) + max; // this will get a number between 1 and 99;
    num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
    return num;
  }

  self.degreeToRadian = function(deg) {
    return deg * (Math.PI / 180);
  }
  return self;
}

module.exports = math;