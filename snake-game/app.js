
document.addEventListener("DOMContentLoaded" , () => {
let squares = document.getElementsByClassName(".squares");

let scoreDisplay = document.querySelector(".scoreDisplay");
let startButton = document.querySelector(".start");
let grid = document.querySelector(".grid");
let playAgain = document.querySelector(".playAgain");
let popup = document.querySelector(".popup");

let left = document.querySelector(".left");
let down = document.querySelector(".down");
let up = document.querySelector(".up");
let right = document.querySelector(".right");

let width = 10;
let currentIndex = [0];
let juiceIndex = [0];
let currentSnake = [2, 1, 0];

let direction = 1;
let score = 0;
let speed = 0.9;
let intervalTime = 0;
let interval = 0;

// mobile event listener, movement
up.addEventListener("click", () => (direction = -width));
down.addEventListener("click", () => (direction = +width));
left.addEventListener("click", () => (direction = -1));
right.addEventListener("click", () => (direction = 1));

// keyboard event listener, movement
document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener("keyup", control);
    createBoard();
    startGame();
    playAgain.addEventListener("click", replay);
})

// startGame funtion
function startGame(){
    let squares = document.querySelectorAll(".grid div");
    randomJuice(squares);
    direction = 1;
    scoreDisplay.innerHTML = score;
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcomes, intervalTime);
}

// what happens to the snake
function moveOutcomes() {
    let squares = document.querySelectorAll(".grid div");
    if (checkForHits(squares)){
        alert("oooooof");
        popup.style.display = "flex";
        return clearInterval(interval);
    } else {
        moveSnake(squares);
    }
    }

// testing pop-up game board
function createBoard(){
    popup.style.display = "none";
    for (let i = 0; i < 100; i++) {
        let div = document.createElement("div");
        grid.appendChild(div);
    }
}

// testing to see if snake hits 
function checkForHits(squares){
    if(
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width <= 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains("snake")
    ){
        return true;
    }   else {
        return false;
    }
}

// eats juice
function eatJuice(squares, tail){
    if(squares[currentSnake[0]].classList.contains("juice")){
        squares[currentSnake[0]].classList.remove("juice");
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        randomJuice(squares);
        
        score++
        scoreDisplay.textContent = score;
        clearInterval(interval);
        intervalTime = intervalTime * speed;
        interval = setInterval(moveOutcomes, intervalTime);
    }
}


// randoJuice function
function randomJuice(squares){
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
}

// restart button functionality
function restart(){
    grid.innerHTML = "";
    createBoard();
    startGame();
    popup.style.display = "none";
}
restart.addEventListener("click", restart);
restart.addEventListener("click", createBoard)

// function to move snake
function moveSnake(squares){
    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0]) + direction;
    eatJuice(squares, tail);
    squares[currentSnake[0]].classList.add("snake");
}

// control functions
function control(e) { 
    let right = 39;
    let up = 38;
    let left = 37;
    let down = 40;

    const keyPressed = even.keyCode;
    const goRight = dx === 10;
    const goUp = dy === -10;
    const goLeft = dx === -10;
    const goDown = dy === 10;

        if (keyPressed === left && !goRight){
            dx = -10;
            dy = 0;
        }
        if (keyPressed === up && !goDown){
            dx = 0;
            dy = -10;
        }
        if (keyPressed === right && !goLeft){
            dx = 10;
            dy = 0;
        }
        if (keyPressed === down && !goUp){
            dx = 0;
            dy = 10;
        }
    }

// right
    if(e.keyCode === 39) {
        direction = 1
    }
// up
    else if (e.keyCode === 38){
        direction = -width
    }
// left
    else if (e.keyCode === 37){
        direction = -1
    }
// down
    else if (e.keyCode === 40){
        direction = +width
    }
})