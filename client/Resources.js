var images = {};
var loadedResources = 0;
var totalResources = 13;
var audio = {
  "smallExplosion": "audio/smallExplosion.mp3",
  "bubbleShoot": "audio/bubbleShoot.mp3",
  "smallerExplosion": "audio/smallerExplosion.mp3"
};

loadImage("neworbs", 'png');
loadImage("jet", 'gif');
loadImage("miniufo", "gif");
loadImage("bullet", "png");
/*
loadImage("explosion", 'png', game);

loadImage("ocean", 'png', game);
loadImage("oceanflipped", 'png', game);

loadImage("cloud1", "png", game);

loadImage("stubbi", "png", game);
loadImage("bubblepuff", "png", game);
loadImage("bulletHit", "png", game);
loadImage("diamanji", "png", game);
, game);
loadImage("airshipA8", "gif", game);
*/


function loadImage(name, extension) {

  images[name] = new Image();
  images[name].onload = function() { 
      resourceLoaded();
  }
  images[name].src = "images/" + name + "." + extension;
}

function playAudio(name, volume) {
  var maudio = document.createElement("audio");
  maudio.src = audio[name];
  maudio.volume = volume;
  maudio.play();
}



function loadAudio(name, extension, game) {
  audio[name] = document.createElement("audio");
  audio[name].src = "audio/" + name + '.' + extension;
  audio[name].onload = function() {
    resourceLoaded(game);
  }
}


function resourceLoaded() {
  loadedResources += 1;
  if (loadedResources == totalResources) {
    
  }
}




