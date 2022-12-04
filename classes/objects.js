class Objects {
  constructor (castle1PX, castle2PX, ce1Images, ce2Images, cO1Images, cO2Images) {
    this.castles = [];
    this.cannonObjects = [];
    
    this.castlePositions =
    [
      [
        {
          x: castle1PX + 60,
          y: height - 195
        },  
       
        {
          x: castle1PX + 182.5,
          y: height - 101.5
        },
       

        {
          x: castle1PX + 148,
          y: height - 244.5
        },
        
        {
          x: castle1PX + 83.1,
          y: height - 314.8
        }    
      ],
      
      [
        {
          x: castle2PX - 25,
          y: height - 195
        }, 
      
        {
          x: castle2PX - 147,
          y: height - 101.75
        },
        
        {
          x: castle2PX - 113,
          y: height - 245
        },
        
        {
          x: castle2PX - 48.1,
          y:  height - 314.8
        }
      ]
    ];

    this.castleImages = [ce1Images, ce2Images];

    this.cOPositions = 
    [
      [
        {
          x: castle1PX,
          y: height - 40
        },

        {
          x: castle1PX,
          y: height - 70
        }
      ],

      [
        {
          x: castle2PX,
          y: height - 40
        },
        
        {
          x: castle2PX,
          y: height - 70
        }
      ]
    ]

    this.cOImages = [cO1Images, cO2Images];    
  }

  addObjects () {
    this.castles = [[], []];
    this.cannonObjects = [[], []];
    for (var x = 0; x < this.castles.length; x++) {
      this.castles[x].length = 4;
      this.cannonObjects[x].length = 2;
      for (var i = 0; i < this.castles[x].length; i++) {
        this.castles[x][i] = createSprite (
          this.castlePositions[x][i].x, 
          this.castlePositions[x][i].y
        );
        this.castles[x][i].addImage (this.castleImages[x][i]);
        this.castles[x][i].scale = 0.37;
        this.castles[x][i].depth = 2;
        this.castles[x][i].health = 150;
        this.castles[x][i].destroyed = false;

        if (i < 2) {
          this.cannonObjects[x][i] = createSprite (
            this.cOPositions[x][i].x,
            this.cOPositions[x][i].y
          );

          this.cannonObjects[x][i].addImage (this.cOImages[x][i]);
          this.cannonObjects[x][i].scale = 0.085;
          this.cannonObjects[x][i].health = 200;
        }
      }
    }
  }

  moveCannonKart(kart, launcher) {
    if (keyDown(RIGHT_ARROW)) {
      kart.position.x += 1;
      launcher.position.x += 1;

      if (player.index == 1 && kart.position.x > width / 2) {
        kart.position.x -= 50;
        launcher.position.x -= 50;
      } else if (player.index == 2 && kart.position.x > width) {
        kart.position.x -= 50;
        launcher.position.x -= 50;
      }
    } else if (keyDown(LEFT_ARROW)) {
      kart.position.x -= 1;
      launcher.position.x -= 1;

      if (player.index == 1 && kart.position.x < 0) {
        kart.position.x += 50;
        launcher.position.x += 50;
      } else if (player.index == 2 && kart.position.x < width/2) {
        kart.position.x += 50;
        launcher.position.x += 50
      }
    }
  }

  writePosition() {
    firebase.ref(`players/player${player.index}`)
      .update({
        positionX: player.positionX,
      }
    )
  }

  readPosition(kart, launcher) {
    firebase.ref(`players/player${player.opponentIndex}/positionX`)
      .on("value", (data) => {
        kart.position.x = data.val();
        launcher.position.x = data.val();
      }
    )
  }

  rotateCannonLauncher (launcher, key1, key2) {
    if (keyDown(key1) && launcher.rotation > -45) {
      launcher.rotation -= 2;
    } else if (keyDown(key2) && launcher.rotation < 45) {
      launcher.rotation +=2;
    } 
  }

  writeAngle(angle) {
    firebase.ref(`players/player${player.index}`)
      .update({
        angle: angle,
      }
    )
  }

  readAngle(launcher) {
    firebase.ref(`players/player${player.opponentIndex}/angle`)
      .on("value", (data) => {
        launcher.rotation = data.val();
      }
    )
  }
} 