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
  }
}



module.exports = patterns;