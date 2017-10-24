function Sprite(image, sx, sy, sWidth, sHeight) {
  this.image = image;
  this.sx = sx;
  this.sy = sy;
  this.sWidth = sWidth;
  this.sHeight = sHeight;

  this.draw = function(ctx, x, y, width, height) {
    ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, x, y, width, height);
  }
}

function SpriteManager() {

  this.sprites = {}

  this.addSprite = function(name, spriteSheet, opts) {

    var defaults = {
      sx: 0,
      sy: 0,
      left: 0,
      top: 0,
      sWidth: 100,
      sHeight: 100,
      sheetWidth: 1,
      sheetHeight: 1,
      rev: false
    }

    var options = Object.assign(defaults, opts);

    var {sx, sy, left, top, sWidth, sHeight, sheetWidth, sheetHeight, rev} = options;


    this.sprites[name] = [];

    if (rev) {

      for (var i = 0; i < sheetWidth; i++) {
        for (var j = 0; j < sheetHeight; j++) {
          this.sprites[name].push(new Sprite(spriteSheet, sx * i, sy * j, sWidth, sHeight));
        }
      }

    } else {
      for (var i = 0; i < sheetHeight; i++) {
        for (var j = 0; j < sheetWidth; j++) {
          this.sprites[name].push(new Sprite(spriteSheet, left + sx * j, top + sy * i, sWidth, sHeight));
        }
      }

    }



  }
}

var SpriteManager = new SpriteManager();

SpriteManager.addSprite('bubble', images['neworbs'], {
  sx: 58.25,
  sy: 58.25,
  sWidth: 58.25,
  sHeight: 58.25,
  sheetWidth: 7,
  sheetHeight: 7
})

SpriteManager.addSprite('stubby', images['stubby'], {
  sx: 46.25,
  sy: 40,
  sWidth: 46.25,
  sHeight: 40,
  sheetWidth: 8,
  sheetHeight: 2
})

SpriteManager.addSprite('stubbi', images['stubbi'], {
  sx: 51,
  sy: 43,
  sWidth: 44,
  sHeight: 38,
  sheetWidth: 12,
  sheetHeight: 1,
  left: 27,
  top: 4
})

SpriteManager.addSprite('explosion', images['explosion'], {
  sx: 128,
  sy: 128,
  sWidth: 128,
  sHeight: 128,
  sheetWidth: 4,
  sheetHeight: 4
})

SpriteManager.addSprite('bubblePuff', images['bubblepuff'], {
  sx: 78.75,
  sy: 75,
  sWidth: 78.75,
  sHeight: 75,
  sheetWidth: 4,
  sheetHeight: 1
})

SpriteManager.addSprite('bulletHit', images['bulletHit'], {
  sx: 192,
  sy: 192,
  sWidth: 192,
  sHeight: 192,
  sheetWidth: 5,
  sheetHeight: 4
})
var s = 129.3333;
SpriteManager.addSprite('daimanji', images['diamanji'], {
  sx: 174,
  sy: s,
  sWidth: 174,
  sHeight: s,
  sheetWidth: 4,
  sheetHeight: 6,
  rev: true
})

var miniUFOData = [
  [27, 4, 44, 38],
  [78, 4, 44, 38],
  [129, 4, 44, 38],
  [180, 4, 43, 38],
  [230, 4, 43, 38],
  [280, 4, 43, 38],
  [29, 50, 43, 37],
  [80, 50, 44, 37],
  [131, 50, 44, 37],
  [180, 50, 44, 37],
  [230, 50, 43, 37],
  [279, 50, 44, 37],
  [121, 94, 43, 38],
  [176, 93, 43, 39],
  [228, 94, 44, 38],
  [279, 93, 44, 39]
]

SpriteManager.sprites['miniufo'] = [];
for(var i = 0; i < miniUFOData.length; i++) {

  SpriteManager.sprites['miniufo'].push(
    new Sprite(images['miniufo'], miniUFOData[i][0], miniUFOData[i][1], miniUFOData[i][2], miniUFOData[i][3])
  );
}

SpriteManager.sprites['explodingUFO'] = [
  new Sprite(images['miniufo'], 27, 4, 44, 38),
  new Sprite(images['miniufo'], 2, 149, 44, 38),
  new Sprite(images['miniufo'], 55, 149, 49, 40),
  new Sprite(images['miniufo'], 112, 142, 54, 50),
  new Sprite(images['miniufo'], 182, 151, 55, 42),
  new Sprite(images['miniufo'], 254, 151, 57, 43),
  new Sprite(images['miniufo'], 46, 205, 56, 54),
  new Sprite(images['miniufo'], 124, 204, 54, 52),
  new Sprite(images['miniufo'], 198, 206, 54, 48),
  new Sprite(images['miniufo'], 266, 204, 55, 53),
  new Sprite(images['miniufo'], 4, 272, 46, 53),
  new Sprite(images['miniufo'], 59, 271, 44, 52),
  new Sprite(images['miniufo'], 114, 270, 45, 52),
  new Sprite(images['miniufo'], 170, 268, 43, 53),
  new Sprite(images['miniufo'], 224, 268, 43, 53),
  new Sprite(images['miniufo'], 279, 267, 43, 54),
  new Sprite(images['miniufo'], 266, 204, 55, 53),
  new Sprite(images['miniufo'], 32, 333, 40, 56),
  new Sprite(images['miniufo'], 84, 333, 38, 55),
  new Sprite(images['miniufo'], 135, 333, 35, 54),
  new Sprite(images['miniufo'], 180, 333, 35, 53),
  new Sprite(images['miniufo'], 235, 358, 31, 53),
  new Sprite(images['miniufo'], 287, 359, 29, 53),
  new Sprite(images['miniufo'], 192, 421, 26, 53)
  

]





