//Game constants and variables
let inputDirection = { x: 0, y: 0 }
const foodSound = new Audio("food.mp3")
const gameOverSound = new Audio("gameover.mp3")
const moveSound = new Audio("move.mp3")
const musicSound = new Audio("music.mp3")
let speed = 8
let lastPaintTime = 0
let score = 0
let snakeArr = [{ x: 12, y: 9 }]
let foodCordinates = { x: 5, y: 6 }

//game functions
const main = (ctime) => {
    window.requestAnimationFrame(main)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }

    lastPaintTime = ctime
    gameEngine()
}

const isCollide = (snake) => {

    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true
        }
    }

    //here we are checking snake bum
    if (snake[0].x >= 30 || snake[0].x <= 0 || snake[0].y >= 30 || snake[0].y <= 0) {
        return true
    }
}

const gameEngine = () => {
    //part 1 : updating the snake array

    if (isCollide(snakeArr)) {
        inputDirection = { x: 0, y: 0 };
        gameOverSound.play()
        // musicSound.pause()
        alert("Game Over. Press enter to play again");
        snakeArr = [{ x: 13, y: 15 }];
        // musicSound.play()
    
        if(score > localStorage.getItem('highScore')){
            localStorage.setItem('highScore', score)
            document.getElementById('highScore').innerText = JSON.parse(localStorage.getItem('highScore'))
        }
        score = 0;
        document.getElementById('score').innerText = score
    }

    //if you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].x === foodCordinates.x && snakeArr[0].y === foodCordinates.y) {

        foodSound.play()
        score = score + 10
        document.getElementById('score').innerText = score
        snakeArr.unshift({ x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y })
        foodCordinates = { x: Math.floor(Math.random() * 16) + 2, y: Math.floor(Math.random() * 16) + 2 }
    }
    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }
    }

    snakeArr[0].x += inputDirection.x
    snakeArr[0].y += inputDirection.y


    //part 2 : display the snake and food
    // display the snake
    const board = document.getElementById("board")
    board.innerHTML = "";

    snakeArr.forEach((ele, idx) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = ele.y;
        snakeElement.style.gridColumnStart = ele.x;

        //this checks that if snake doesnt eat not a single food then
        if (idx === 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    })

    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = foodCordinates.y;
    foodElement.style.gridColumnStart = foodCordinates.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}

if (/mac|macintosh|webOS|window/i.test(navigator.userAgent)) {
    // console.log("You are at desktop")

    let highScore = localStorage.getItem("highScore");

    
    if (highScore === null) {
        localStorage.setItem("highScore", JSON.stringify(0))
    }

    document.getElementById('highScore').innerText = JSON.parse(localStorage.getItem('highScore'))
   
    //game loop starts from here which calls main function
    window.requestAnimationFrame(main)
}
else {
    alert("your device is not compatible, Use PC to play the game.")
}


// musicSound.play()

window.addEventListener('keydown', event => {
    inputDirection = { x: 0, y: 1 } //game start
    // console.log(event)
    switch (event.key) {

        case "ArrowUp":
            inputDirection.x = 0;
            inputDirection.y = -1
            break;

        case "ArrowDown":
            inputDirection.x = 0;
            inputDirection.y = 1
            break;

        case "ArrowLeft":
            inputDirection.x = -1;
            inputDirection.y = 0
            break;

        case "ArrowRight":
            inputDirection.x = 1;
            inputDirection.y = 0
            break;

        default:
            break;
    }
})