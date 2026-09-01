let mario =document.querySelector(".mario");
let obstacle = document.querySelector(".obstacle");
let gameOver = document.querySelector(".game-over");
let button = document.querySelector("button");
let scoreText = document.querySelector(".score");

let marioX = 50;
let marioY = 0;

let obstacleX = 800;
let score = 0;
let gameRunning = true;
let isJumping = false;


document.addEventListener("keydown",(event)=>{
console.log(event.key);

if(gameRunning==false){
    return;
}
if(event.key=="ArrowRight"||event.key=="d"){
    marioX+=10;
    if(marioX >= 700){
        marioX = 700;
    }
    mario.style.left = marioX +"px";
}
if(event.key=="ArrowLeft"){
    marioX-=10;
    if(marioX <= 50){
        marioX = 50;
    }
    mario.style.left = marioX + "px";
}

if(event.key =="W"||event.key==" "||event.key=="ArrowUp"){
   jump();
}
})

function jump(){
    if(isJumping==true){
        return;
    }
    isJumping=true;
    let jumpUp = setInterval(()=>{
        marioY += 12;

        mario.style.bottom = marioY+"px";
        if(marioY>=120){
            clearInterval(jumpUp)

            let jumpDown = setInterval(()=>{
                marioY -= 10;
                mario.style.bottom = marioY+"px";

                if(marioY<=0){
                    clearInterval(jumpDown);
                    isJumping=false;
                }
            },20);
        }
    },10);
}

let gameloop = setInterval(()=>{
    obstacleX -= 10;
    obstacle.style.left = obstacleX+"px";
    if(obstacleX<= -40){
        obstacleX = 800;

        score++;
        scoreText.innerText = `Score : ${score}`

    }

    let marioBox = mario.getBoundingClientRect();
    
    let obstacleBox = obstacle.getBoundingClientRect();
    console.log(marioBox,obstacleBox);

    if (
    marioBox.left < obstacleBox.right &&
    marioBox.right > obstacleBox.left &&
    marioBox.top < obstacleBox.bottom &&
    marioBox.bottom > obstacleBox.top
){
    gameRunning=false;
    gameOver.style.display="flex";
    clearInterval(gameloop);
    
}
},20);

button.addEventListener("click", () => {
    location.reload();
});












