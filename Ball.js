const INITIAL_VELOCITY = .025
const VELOCITY_INCREASE = .00001

export default class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem
    this.reset()
  }

  get x() {
    // take the value from css (50) and convert it into a javascript number
    // that can be used
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
  }

  set x(value) {
    this.ballElem.style.setProperty("--x", value)
  }

  get y() {
    // take the value from css (50) and convert it into a javascript number
    // that can be used
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
  }

  set y(value) {
    this.ballElem.style.setProperty("--y", value)
  }

  rect() { // get the position of the ball
    return this.ballElem.getBoundingClientRect()
  }

  reset() {  
    this.x = 50 // reset x position of the ball
    this.y = 50 // reset y position of the ball
    this.direction = { x: 0 }
    // while in place to make sure the x direction is big enough, to avoid the 
    // ball to move vertically
    while (
      Math.abs(this.direction.x) <= .2 || 
      Math.abs(this.direction.x) >= .9
    ) {
      // to define the direction of the ball in radiants
      const heading = randomNumberBetween(0, 2 * Math.PI)  
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
    }
    this.velocity = INITIAL_VELOCITY
  }
  
  //paddleRects added to make the ball bounce when touching the paddle
  update(delta, paddleRects) {
    this.x += this.direction.x * this.velocity * delta
    this.y += this.direction.y * this.velocity * delta
    this.velocity += VELOCITY_INCREASE * delta
    const rect = this.rect()
    
    //if the ball goes past the bottom or the top of the screen
    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1       // in this case flip the direction
    }  

    //if there is a collision between the ball and the paddle
    // change the direction
    if (paddleRects.some(r => isCollision(r, rect))) {
      this.direction.x *= -1       
    }  
  }
}

function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min
}

//check the collision
function isCollision(rect1, rect2) {
  return (
    rect1.left <= rect2.right && 
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  )
}