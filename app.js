document.addEventListener('DOMContentLoaded', () => {
  const SQUARES = document.querySelectorAll('.grid div')
  const TIME_LEFT = document.querySelector('#time-left')
  const RESULT = document.querySelector('#result')
  const START_BTN = document.querySelector('#button')
  const CARS_LEFT = document.querySelectorAll('.car-left')
  const CARS_RIGHT = document.querySelectorAll('.car-right')
  const LOGS_LEFT = document.querySelectorAll('.log-left')
  const LOGS_RIGHT = document.querySelectorAll('.log-right')
  const WIDTH = 9
  let currentIndex = 76
  let currentTime = 20
  let timerId

  // render from on starting block
  SQUARES[currentIndex].classList.add('frog')

  // write a function that will move the frog
  function moveFrog(e) {
    SQUARES[currentIndex].classList.remove('frog')

    switch(e.keyCode) {
      case 37:
        if (currentIndex % WIDTH !== 0) currentIndex -=1
        break
      case 38:
        if (currentIndex - WIDTH >=0) currentIndex -= WIDTH
        break
      case 39:
        if (currentIndex % WIDTH < WIDTH -1) currentIndex +=1
        break
      case 40:
        if (currentIndex + WIDTH < WIDTH * WIDTH) currentIndex += WIDTH
        break
    }

    SQUARES[currentIndex].classList.add('frog')
    lose()
    win()
  }

  // move cars
  function autoMoveCars() {
    CARS_LEFT.forEach(carLeft => moveCarLeft(carLeft))
    CARS_RIGHT.forEach(carRight => moveCarRight(carRight))
  }

  // move the car left on a time loop
  function moveCarLeft(carLeft) {
    switch (true) {
      case carLeft.classList.contains('c1'):
        carLeft.classList.remove('c1')
        carLeft.classList.add('c2')
        break
      case carLeft.classList.contains('c2'):
        carLeft.classList.remove('c2')
        carLeft.classList.add('c3')
        break
      case carLeft.classList.contains('c3'):
        carLeft.classList.remove('c3')
        carLeft.classList.add('c1')
        break
    }
  }

  // move the car right on a time loop
  function moveCarRight(carRight) {
    switch (true) {
      case carRight.classList.contains('c1'):
        carRight.classList.remove('c1')
        carRight.classList.add('c3')
        break
      case carRight.classList.contains('c2'):
        carRight.classList.remove('c2')
        carRight.classList.add('c1')
        break
      case carRight.classList.contains('c3'):
        carRight.classList.remove('c3')
        carRight.classList.add('c2')
        break
    }
  }

  // move logs
  function autoMoveLogs() {
    LOGS_LEFT.forEach(logLeft => moveLogLeft(logLeft))
    LOGS_RIGHT.forEach(logRight => moveLogRight(logRight))
  }

  // move the log left on a time loop
  function moveLogLeft(logLeft) {
    switch (true) {
      case logLeft.classList.contains('l1'):
        logLeft.classList.remove('l1')
        logLeft.classList.add('l2')
        break
      case logLeft.classList.contains('l2'):
        logLeft.classList.remove('l2')
        logLeft.classList.add('l3')
        break
      case logLeft.classList.contains('l3'):
        logLeft.classList.remove('l3')
        logLeft.classList.add('l4')
        break
      case logLeft.classList.contains('l4'):
        logLeft.classList.remove('l4')
        logLeft.classList.add('l5')
        break
      case logLeft.classList.contains('l5'):
        logLeft.classList.remove('l5')
        logLeft.classList.add('l1')
        break
    }
  }

  // move the log right on a time loop
  function moveLogRight(logRight) {
    switch (true) {
      case logRight.classList.contains('l1'):
        logRight.classList.remove('l1')
        logRight.classList.add('l5')
        break
      case logRight.classList.contains('l2'):
        logRight.classList.remove('l2')
        logRight.classList.add('l1')
        break
      case logRight.classList.contains('l3'):
        logRight.classList.remove('l3')
        logRight.classList.add('l2')
        break
      case logRight.classList.contains('l4'):
        logRight.classList.remove('l4')
        logRight.classList.add('l3')
        break
      case logRight.classList.contains('l5'):
        logRight.classList.remove('l5')
        logRight.classList.add('l4')
        break
    }
  }

  // rules to win frogger
  function win() {
    if (SQUARES[4].classList.contains('frog')) {
      RESULT.innerHTML = 'you won'
      SQUARES[currentIndex].classList.remove('frog')
      clearInterval(timerId)
      document.removeEventListener('keyup', moveFrog)
    }
  }

  // rules to lose frogger
  function lose() {
    if ((currentTime === 0) || (SQUARES[currentIndex].classList.contains('c1'))
    || (SQUARES[currentIndex].classList.contains('l5'))
    || (SQUARES[currentIndex].classList.contains('l4'))) {
      RESULT.innerHTML = 'you lose'
      SQUARES[currentIndex].classList.remove('frog')
      clearInterval(timerId)
      document.removeEventListener('keyup', moveFrog)
    }
  }

  // move the frog when its on the log moving left
  function moveWithLogLeft() {
    if (currentIndex >= 27 && currentIndex < 35) {
      SQUARES[currentIndex].classList.remove('frog')
      currentIndex += 1
      SQUARES[currentIndex].classList.add('frog')
    }
  }

  // move the frog when its on the log moving right
  function moveWithLogRight() {
    if (currentIndex > 18 && currentIndex <= 26) {
      SQUARES[currentIndex].classList.remove('frog')
      currentIndex -= 1
      SQUARES[currentIndex].classList.add('frog')
    }
  }

  // all the functions that move pieces
  function movePieces() {
    currentTime--
    TIME_LEFT.textContent = currentTime
    autoMoveCars()
    autoMoveLogs()
    moveWithLogLeft()
    moveWithLogRight()
    lose()
  }

  // to start and pause the game
  START_BTN.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
    } else {
      timerId = setInterval(movePieces, 1000)
      document.addEventListener('keyup', moveFrog)
    }
  })
})