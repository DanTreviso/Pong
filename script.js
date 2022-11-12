import Ball from "./Ball.js"
import Paddle from "./Paddle.js"

/*take the ball html element and create a new class*/
const ball = new Ball(document.getElementById("ball"))
// same thing a sprevious but for the paddle
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")

/*the next function and window creates an infinite loop, it calls
every time something on the screen is allowed to change*/
/*as a variable take how much time has passed since tha start of the program*/
let lastTime
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
    computerPaddle.update(delta, ball.y)
    const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue
    ("--hue"))

    document.documentElement.style.setProperty("--hue", hue + delta * .01)

    if (isLose()) handleLose()
  }
  lastTime = time 
  window.requestAnimationFrame(update)
}

function isLose() {
  const rect = ball.rect()
  // check if the ball is out on the left or right side
  // if so, we have lost
  return rect.right >= window.innerWidth || rect.left <= 0 
}

// to handle the situation when lose
function handleLose() {
  const rect = ball.rect()
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
  }
  ball.reset()
  computerPaddle.reset()
}

document.addEventListener("mousemove", e => {
    // position to be converted from %: value assigned in .css
    playerPaddle.position = (e.y / window.innerHeight) * 100
})

/*to call the update function, every time something changes*/
window.requestAnimationFrame(update)