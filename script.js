const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
canvas.style.border = "5px solid black"
let y = 300
let x = 200
function drawBall(x, y){
ctx.beginPath();
ctx.arc(x, y, 20, 0, Math.PI * 2, false)
ctx.fillStyle = 'blue';
ctx.fill()
ctx.closePath()
}
function drawrect(x){
ctx.beginPath()
ctx.rect(x, 600, 140, 10)
ctx.fillStyle = 'red';
ctx.fill()
ctx.closePath()
}
let move = 0
let speed = +1
let yspeed = +5
document.addEventListener('keydown', handlekey);
function handlekey(event){
    if(event.key == "a" && move >= 10){
    move -= 10
    }
    if(event.key == "d" && move + 150 <= canvas.width){
        move += 10
        }
}
const blocks = []

let y_cord = 20
// створити змінну i = 0, повторювати наступні команди, поки *якась умова*, кожного разу збільшую і
function x_box(){
let x_cord = 75;
for (let i = 0; i < 5; i++){
blocks.push({x:x_cord, y:y_cord , width: 80, height: 30 })
    x_cord += 90    
}
}
for (let j = 0; j < 3; j++){
    y_cord += 60
    x_box()
}
function drawBlocks() {
    for (const block of blocks) {
        ctx.beginPath();
        ctx.rect(block.x, block.y, block.width, block.height);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.closePath();
    }
}
function touchBlock(ballX, ballY, ballWidth, ballHeight, blockX, blockY, blockWidth, blockHeight) {
    return (
        ballY + ballHeight >= blockY && // Ball is below the top of the block
        ballY <= blockY + blockHeight && // Ball is above the bottom of the block
        ballX + ballWidth >= blockX && // Ball is to the right of the left side of the block
        ballX <= blockX + blockWidth // Ball is to the left of the right side of the block
    );
}

function draw() { 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(x, y);
    drawrect(move);
    drawBlocks();
    
    const oldX = x; // Store the old position of the ball
    const oldY = y;
    
    // Update the ball's position
    x += speed;
    y += yspeed;

    // Check for wall collisions
    if (x + 20 >= canvas.width || x - 20 <= 0) speed *= -1;  
    if (y + 20 >= canvas.height || y - 20 <= 0) yspeed *= -1;  

    // Check for ground collision
    if (y + 20 >= 600 && x >= move && x <= move + 140) {
        yspeed *= -1; 
        y = 580; // Place the ball on top of the rect
    }

    // Check for block collisions
    for (const block of blocks) {
        if (touchBlock(oldX, oldY, 20, 20, block.x, block.y, block.width, block.height)) {
            // Перевіряємо, з якого боку був контакт
            if (y + 20 > block.y && y - 20 < block.y + block.height) {
                // Вертикальний відбій
                yspeed *= -1;
            } else {
                // Горизонтальний відбій
                speed *= -1;
            }
    
            // Видаляємо блок після зіткнення
            blocks.splice(blocks.indexOf(block), 1);
            break; // Виходимо з циклу, щоб уникнути конфліктів
        }
    }
}
setInterval(draw, 1000 / 60)