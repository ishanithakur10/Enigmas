let dir = { x: 0, y: 0 };

let fs = new Audio("decidemp3-14575.mp3");
let es = new Audio("end.wav");
let ms = new Audio("rattles-80176.mp3");
let musicSound = new Audio("bg sound.mp3");

let lastPaintTime = 0;
let score=0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };

// Get the board element where the game is played (chota vala)
let board = document.querySelector('.board');

                        //-------- functions:--------//

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / 6) {    // controls the speed
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

//checks with the snake array
function itCollides(sArr){
    // true=>yes it collides
    // false=>no
    // with itself
    for(let i=1;i<sArr.length;i++){
        // sArr[0]=>is head
        if(sArr[i].x===sArr[0].x && sArr[i].y===sArr[0].y){
            ms.pause();
            es.play(); 
            return true;
        }
    }
    //wall
    if(sArr[0].x>=18 || sArr[0].x<=0 ||sArr[0].y>=18 || sArr[0].y<=0){
        ms.pause();
        es.play(); 
        return true;
    }

    return false;
}



function gameEngine() {
   if(itCollides(snakeArr)){
    // es.play(); 
    alert("GAME OVER. Press enter key to play again. Refresh the page to start a new game.")
    dir={x:0,y:0};
    snakeArr= [{ x: 13, y: 15 }];
    ms.play();
    score=0;
}

//After eating food
if(snakeArr[0].y===food.y && snakeArr[0].x==food.x){
    fs.play();
    score+=1;
    if(score>Hvalue){
        Hvalue=score;
        localStorage.setItem("highscore",JSON.stringify(Hvalue));
        highsc.innerHTML="HighScore= "+Hvalue;
    }
    sc.innerHTML="Score: "+score;
    ms.play();
    snakeArr.unshift({x:snakeArr[0].x+dir.x, y:snakeArr[0].y+dir.y});
    let a=2;
    let b=17;
    food={x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())}
}

//inc length(move)
for(let i=snakeArr.length-2;i>=0;i--){
    snakeArr[i+1]={...snakeArr[i]};
}
snakeArr[0].x+=dir.x;
snakeArr[0].y+=dir.y;


                              //------------ Displays of the game -----------//
    // Clear the previous frame
     board.innerHTML = "";

    // Snake
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.x;
        snakeElement.style.gridColumnStart = e.y;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.x;
    foodElement.style.gridColumnStart = food.y;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// game loop
let highscore=localStorage.getItem("highscore");
if(highscore===null){
    Hvalue=0;
    localStorage.setItem("highscore",JSON.stringify(Hvalue));
}else{
    Hvalue=JSON.parse(highscore);
highsc.innerHTML="HighScore= "+Hvalue;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    ms.play();
    switch (e.key) {
        case "ArrowUp":
            dir.x = -1;
            dir.y = 0;
            break;

        case "ArrowDown":
            dir.x = 1;
            dir.y = 0;
            break;

        case "ArrowLeft":
            dir.x = 0;
            dir.y = -1;
            break;

        case "ArrowRight":
            dir.x = 0;
            dir.y = 1;
            break;
        default:
            break;
    }
});
