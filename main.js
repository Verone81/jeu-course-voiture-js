let canvas = document.getElementById("plateau-jeu");
let ctx = canvas.getContext("2d");

let img_auto = new Image();
let img_route = new Image();
let img_obstacle = new Image();

let list_obstacle = ["images/auto_jaune.png", "images/auto_bleu.png", "images/auto_verte.png"];
img_auto.src = "images/auto.png";
img_route.src = "images/route.png";

let list_position_obstacle = [125, 240];
let yy_obstacle = 25; 

let xx_auto = 240;
yy_auto = 500;
let xx_obstacle;

let auto_droite = false;

let points = 0;

img_obstacle.src = list_obstacle[Math.floor(Math.random() * 3)];
xx_obstacle = list_position_obstacle[Math.floor(Math.random() * 2)];
ctx.drawImage(img_obstacle, xx_obstacle, yy_obstacle, 45, 75);

function gameOver(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
}


function hasardObstacle() {
    yy_obstacle += 10;
    if (yy_obstacle > canvas.height) {
        img_obstacle.src = list_obstacle[Math.floor(Math.random() * 3)];
        xx_obstacle = list_position_obstacle[Math.floor(Math.random() * 2)];
        ctx.drawImage(img_obstacle, xx_obstacle, yy_obstacle, 45, 75);
        points += 1;
        yy_obstacle = 25;
        
    }
    
    ctx.drawImage(img_obstacle, xx_obstacle, yy_obstacle, 45, 75);
}

function scorePoint() {
    ctx.font = "25px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Points: " + points, 10, 30);
}


function collisionObstacle() {
    if (xx_auto + 45 > xx_obstacle && xx_auto < xx_obstacle + 45 && yy_auto + 75 > yy_obstacle && yy_auto < yy_obstacle + 75) {
        gameOver();
        ctx.font = "25px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Tu as fait " + points + " points", canvas.width/2, canvas.height/2 + 35);
        cancelAnimationFrame(animationID); 
        return true; 
    }
    return false; 
}
let animationID;

function deplacerVoiture() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.drawImage(img_route, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(img_auto, xx_auto, yy_auto, 45, 75);
    hasardObstacle();
    scorePoint();


    if (auto_droite && xx_auto < 300){
        xx_auto += 5;
    }
    else if(xx_auto > 100){
        xx_auto -= 5;
    }

    if (collisionObstacle()) {
        
        return; 
    }
   
    animationID = requestAnimationFrame(deplacerVoiture); 
}

document.addEventListener("keydown", function(event) {
    
    if (event.key === "ArrowRight") {
        auto_droite = true;
    }
});


document.addEventListener("keyup", function(event) {
    
    if (event.key === "ArrowRight") {
        auto_droite = false;
    }
});

deplacerVoiture();