const SPEED = .02   // max speed assigned to the computer paddlle

export default class Paddle {
    constructor(paddleElem) {
        this.paddleElem = paddleElem
        this.reset()
    }

    // set the position of the paddle with a setter and a getter
    get position() {
      return parseFloat(
        getComputedStyle(this.paddleElem).getPropertyValue("--position")
      )
    }

    set position(value) {
      this.paddleElem.style.setProperty("--position", value)
    }
    
    rect() {
      return this.paddleElem.getBoundingClientRect()
    }

    reset() {
        this.position = 50
    }

    update(delta, ballHeight) {
      // computer paddle can move faster as more far away it is from the ball
      this.position += SPEED * delta *(ballHeight - this.position)
    }
}