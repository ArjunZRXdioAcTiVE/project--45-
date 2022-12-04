class CannonBall {
  constructor() {
    this.ball = Bodies.circle(
      player.positionX,
      height - 70,
      20,
      { isStatic: true }
    );
    World.add(world, this.ball);

    this.ballRemoved = false;

    this.shot = false;
  }

  displayBall(index) {
    if (!this.shot) {
      this.ball.position.x = player.positionX;
    }
       
    var ballPos = this.ball.position;
    image(cBI, ballPos.x, ballPos.y, 40, 40);  
        
      
    if (
      this.ball.position.x > width + 60 || 
      this.ball.position.x < -60 ||
      this.ball.position.y > height + 60
    ){
      World.remove(world, this.ball);
      this.ball = null;
      delete this.ball;
  
      this.ballRemoved = true

      const i = firebaseIndex.get(`cannonBalls[${index}]`);
      firebase.ref(`players/player${player.index}/cannonBalls/${i}`)
        .update({
          removed: true,
          posX: 0,
          posY: 0
        }
      );
      return;
    };

    const i = firebaseIndex.get(`cannonBalls[${index}]`);
    if (i !== undefined) {
      firebase.ref(`players/player${player.index}/cannonBalls/${i}`)
        .update({
          posX: Math.round(this.ball.position.x),
          posY: Math.round(this.ball.position.y)
        }
      );  
    }  
  }

  shoot(launcher) {
    var newAngle = launcher.rotation - 28;
    newAngle = newAngle * (3.14 / 180);
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(0.5);
    Body.setStatic(this.ball, false);
    Body.setVelocity(this.ball, {
      x: velocity.x * (180 / 3.14),
      y: velocity.y * (180 / 3.14),
    });

    this.shot = true;
  }
}