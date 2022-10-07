document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector(".gameBoard");
    const squares = document.getElementsByClassName('gameSquares');
    const scoreDisplay = document.querySelector('.score span');
    const startBtn = document.querySelector('.start');
    const restartBtn = document.querySelector('.restart');
    const tenBtn = document.querySelector('.ten')
    const fifteenBtn = document.querySelector('.fifteen');
    const twentyBtn = document.querySelector('.twenty');

        const up = document.querySelector(".up");
        const right = document.querySelector(".right");
        const down = document.querySelector(".down");
        const left = document.querySelector(".left");
                                                                                  
    let currentIndex = 0;//first div in grid
    let appleIndex = 0;//first div in grid
    let currentSnake = [2, 1, 0];//the div in our grid being 2 (or the HEAD), and 0 being the end (TAIL), all 1 is body
    let direction = 1; //snake will travel 1 div down the array
    let speed = 0.95;
    let intervalTime = 0;
    let interval = 0;
    
    gameBoard.style.backgroundColor = "grey";
  
    //make object constructor for the grid
   
    class playArea{ constructor (width, rowLength, score) {         
        this.width = width;
        this.rowLength = rowLength;
        this.score = score;                    
        this.area = this.rowLength * this.rowLength;
        this.totRowLength = this.width * this.rowLength + 'px';    
    }}

     //trying to make new level
    //trying to make all dimensions into modifiable variables
    
  let LevelOne = new playArea(20, 10, 0);
   
   function gridSize (x){
       switch(x){
           case 10:
            LevelOne = new playArea(20, 10, 0);
            console.log('10x10');
            break;

            case 15:
            LevelOne = new playArea(20, 15, 0);
            console.log('15x15');
            break;

            case 20:
            LevelOne = new playArea(20, 20, 0);
            console.log('20x20');
        }
       gameBoard.style.width = LevelOne.totRowLength;
       gameBoard.style.height = LevelOne.totRowLength;
       scoreDisplay.textContent = 0;
       restartGame();makeGrid();
    }


   tenBtn.addEventListener('click', ()=>(gridSize(10)))   
   tenBtn.addEventListener('click', console.log(10));
     

   fifteenBtn.addEventListener('click', ()=>{gridSize(15)});
   fifteenBtn.addEventListener('click', console.log(15));


   twentyBtn.addEventListener('click', ()=>{gridSize(20)});
   twentyBtn.addEventListener('click', console.log(20));

     
      //this makes a board/grid size before changing it --> default 10x10  
        gameBoard.style.width = LevelOne.totRowLength;
        gameBoard.style.height = LevelOne.totRowLength;

    //restart game
        function restartGame(){
            //clear all div
           if (gameBoard.hasChildNodes)
                    {gameBoard.innerHTML = "";
                    gameBoard.classList.remove("snake");
                    gameBoard.classList.remove("apple");
            console.log("no more squares");             
            clearInterval(interval); 
            scoreDisplay.textContent = 0;
           }}
        
    //automate grid div creation
      function makeGrid(){             
        for (let i = 0; i<LevelOne.area; i++){           
            //creating divs
            let gameSquares = document.createElement("div");
            gameSquares.className = "gameSquares";
            gameBoard.appendChild(gameSquares);
        }}
        makeGrid();

    
    //start game
 
  
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        randomApple();
        score = LevelOne.score;
        direction = 1;
        scoreDisplay.innertext = score;
        intervalTime = 500;
        currentSnake = [2,1,0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        interval = setInterval(moveOutcomes, intervalTime);    
        console.log(squares.parentNode);  
        console.log("starting YES");

    }


    //function that deals with All the move outcomes of the Snake

    function moveOutcomes(){
    //deals with snake hitting the border and self
    if((currentSnake[0] + LevelOne.rowLength >= (LevelOne.area) && direction === LevelOne.rowLength)|| //if snake hits bottom
        (currentSnake[0] % LevelOne.rowLength === LevelOne.rowLength -1 && direction === 1)|| //if snake hits right wall
        (currentSnake[0] % LevelOne.rowLength === 0 && direction === -1)|| //if snake hits left wall
        (currentSnake[0] - LevelOne.rowLength < 0 && direction === -LevelOne.rowLength)|| // if snake hits top
        squares[currentSnake[0] + direction].classList.contains('snake')) //if snake goes into itself
        {
            console.log("Good Try Snake Tamer");      
            
            return clearInterval(interval);//clears interval is any of the above happens
        }

        //make snake move forward
        const tail = currentSnake.pop();
        squares[tail].classList.remove('snake');
        currentSnake.unshift(currentSnake[0] + direction); 
        console.log(direction);

  
        
        restartBtn.addEventListener("click", restartGame);
        restartBtn.addEventListener("click", makeGrid);


     //deals with snake getting apple
        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            randomApple(); 
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime);
            }

            squares[currentSnake[0]].classList.add('snake');
    }//moveOutcomes function ends here


    //assign functions to keycodes start 
    function control(e){                
        if(e.keyCode === 39 && direction !== -1){//right arrow will make snake go right one div
            e.keycode !== -37;
            direction = 1;             
        }else if (e.keyCode === 38 && direction !== LevelOne.rowLength){//up arrow will make snake go 10 divs back, appearing to go up
            e.keycode !== 40;
            direction = -LevelOne.rowLength;
        }else if(e.keyCode === 37 && direction !== 1){// left arrow will make snake go left one div
            e.keycode !== 39;
            direction = -1; 
        }else if(e.keyCode === 40 && direction !== -LevelOne.rowlength){// down button then snake will go 10 divs ahead
            e.keycode !== 38;
            direction = +LevelOne.rowLength;
        }
        console.log(e);
    }
 
    
    //generate new apple once apple is eaten
 function randomApple(){
    do{
        appleIndex = Math.floor(Math.random() * squares.length);
    }
    while(squares[appleIndex].classList.contains('snake'));// making sure apples don't appear on snake
    squares[appleIndex].classList.add("apple");
}

    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame); 


// button controls   9-30 2056 
up.addEventListener("click", ()=> butControl(up))
right.addEventListener("click", ()=> butControl(right))
down.addEventListener("click", ()=> butControl(down))
left.addEventListener("click", ()=> butControl(left))

function butControl(e){
    if (e == up && direction !== LevelOne.rowLength){
        direction = -LevelOne.rowLength;
        console.log('up');
        console.log(direction);
    }
    else if (e == right && direction !== -1){
        direction = 1;
        console.log('right');
        console.log(direction);
    }
    else if (e == down && direction !== -LevelOne.rowLength){
        direction = +LevelOne.rowLength; 
        console.log('down');
        console.log(direction);
    }
    else if (e == left && direction !== 1){
        direction = -1;
        console.log('left');
        console.log(direction);
    }
}
// optimistically adding mobile event listeners
document.addEventListener("touchstart", e =>{
    console.log("start")
})
document.addEventListener("touchmove", e =>{
    console.log("move")
})
document.addEventListener("touchend", e =>{
    console.log("end")
})
 })


