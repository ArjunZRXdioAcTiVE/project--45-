// Investigate Draw SPites
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var cannonObjects = [];

var 
    kart1_Imgs = [], kart2_Imgs = [],
    cannonBalls = [], cBI, launchE
;

var gameObjects;

var castles = [];

var 
    castle1Images = [],
    castle2Images = []
;

var 
    form, formBackground_Img,
    game,  gameState = 0, background_Img,
    player, playerCount = 0
;

var engine, world;

var firebase;

var seconds = [], m;

const firebaseIndex = new Map();

function preload () {
    var cannonKart1_Img = loadImage ("assets/cannonKart1.png");
    var cannonLauncher1_Img = loadImage ("assets/cannonLauncher1.png");

    var cannonKart2_Img = loadImage ("assets/cannonKart2.png");
    var cannonLauncher2_Img = loadImage ("assets/cannonLauncher2.png");
    
    kart1_Imgs.push(
        cannonKart1_Img,
        cannonLauncher1_Img
    );

    kart2_Imgs.push(
        cannonKart2_Img,
        cannonLauncher2_Img
    );

    cBI = loadImage ("assets/cannonBall_I.png");
    launchE = loadImage ("assets/fire.png");

    background_Img = loadImage ("assets/background.jpg");

    var castle1Broken_Img = loadImage ("assets/castleAssets/castle1.png");
    var castle1DP_Img = loadImage ("assets/castleAssets/castleDownPart1.png");
    var castle1MP_Img = loadImage ("assets/castleAssets/castleMiddlePart1.png");
    var castle1UP_Img = loadImage ("assets/castleAssets/castleUpPart1.png");

    var castle2Broken_Img = loadImage ("assets/castleAssets/castle2.png");
    var castle2DP_Img = loadImage ("assets/castleAssets/castleDownPart2.png");
    var castle2MP_Img = loadImage ("assets/castleAssets/castleMiddlePart2.png");
    var castle2UP_Img = loadImage ("assets/castleAssets/castleUpPart2.png");

    castle1Images.push(
        castle1Broken_Img,
        castle1DP_Img,
        castle1MP_Img,
        castle1UP_Img
    );

    castle2Images.push(
        castle2Broken_Img,
        castle2DP_Img,
        castle2MP_Img,
        castle2UP_Img
    )

    formBackground_Img = loadImage ("assets/formBackground.png");
}

function setup () {
    createCanvas (windowWidth, windowHeight);

    engine = Engine.create();
    world = engine.world;

    firebase = firebase.database ();

    game = new Game ();
    game.initializeGame ();

    game.reset();
}

function draw () {
    if (playerCount < 2) {
        background(formBackground_Img);
    }


    if (playerCount == 2 && gameState == 0) {
        player.messagingSetup ()

        game.gameStart ();
        game.detectCannonBallP ();     
        gameState = 1;
    }

    if (playerCount == 2 && gameState == 1) {
        game.play(
            gameObjects.castles[0],
            gameObjects.castles[1],
            gameObjects.cannonObjects[0],
            gameObjects.cannonObjects[1]
        );
    }

    if (gameState == 2) {
        gameEnd();
    }

    Engine.update(engine);
    drawSprites ();
}

function gameEnd() {
    swal({
        title: "You won",
        // Add text
        imageUrl:
            "https://raw.githubusercontent.com/ArjunZRXdioAcTiVE/image/main/gameEndCastleImage(won).png",        
        imageSize: "100x100" 
    });
    
}