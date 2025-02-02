window.addEventListener('load', function() {
    const storedName = this.localStorage.getItem('kluch');
    if (storedName){
        paragraph.innerHTML = 'blocks destroyed: ' + storedName
    }
})
let blocksReinitializing = false; // Flag to prevent multiple resets
const right = document.getElementById("right")
const button = document.getElementById("delete")
const left = document.getElementById("left")
const paragraph = document.getElementById("count")
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
canvas.style.border = "5px solid #ffff00"
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
ctx.roundRect(x, 600, 140, 10, 10)
ctx.fillStyle = 'red';
ctx.fill()
ctx.closePath()
}
let levelNumber = 1

const levels = [
        // Level 1
        [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [1, 0, 0, 1],
            [1, 1, 0, 0],
            [1, 0, 0, 0],
        ],
        // Level 2
        [
            [0, 0, 1, 1, 1],
            [1, 0, 1, 0, 1],
            [0, 0, 0, 1, 1],
            [0, 1, 0, 1, 1],
        ],
        // Level 3
        [
            [0, 1, 0, 1],
            [0, 0, 1, 1],
            [1, 0, 0, 1],
            [0, 1, 0, 0],
        ],
        // Level 4
        [
            [0, 1, 0, 1, 0],
            [1, 1, 1, 0, 0],
            [0, 1, 0, 1, 1],
        ],
        // Level 5
        [
            [0, 0, 0, 0],
            [1, 1, 0, 1],
            [0, 0, 0, 0],
            [1, 0, 1, 0],
        ],
        // Level 6
        [
            [1, 1, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 1, 0, 1],
            [0, 0, 1, 1, 1],
            [1, 1, 1, 1, 0],
        ],
        // Level 7
        [
            [1, 1, 1, 0],
            [0, 0, 1, 1],
            [1, 0, 0, 1],
            [1, 0, 1, 1],
            [0, 0, 0, 0],
        ],
        // Level 8
        [
            [0, 1, 1],
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
        ],
        // Level 9
        [
            [0, 1, 0, 0],
            [1, 0, 1, 1],
            [1, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 1],
        ],
        // Level 10
        [
            [1, 1, 1],
            [0, 1, 1],
            [0, 1, 1],
        ],
        // Level 11
        [
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 1],
            [1, 1, 0, 1],
            [1, 0, 0, 0],
        ],
        // Level 12
        [
            [0, 1, 0, 1],
            [1, 0, 1, 0],
            [0, 0, 0, 1],
            [0, 1, 1, 0],
            [0, 0, 0, 1],
        ],
        // Level 13
        [
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
        ],
        // Level 14
        [
            [1, 0, 1, 1],
            [1, 1, 0, 1],
            [1, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        // Level 15
        [
            [1, 1, 0],
            [1, 1, 1],
            [1, 1, 0],
            [1, 1, 0],
            [1, 0, 0],
        ],
        // Level 16
        [
            [1, 1, 0, 1],
            [1, 0, 1, 1],
            [1, 1, 0, 0],
        ],
        // Level 17
        [
            [0, 1, 0, 1],
            [1, 0, 0, 1],
            [0, 1, 0, 0],
            [0, 1, 1, 1],
            [1, 0, 0, 0],
        ],
        // Level 18
        [
            [1, 0, 1],
            [1, 1, 0],
            [1, 1, 1],
            [1, 0, 1],
        ],
        // Level 19
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 1, 0, 0],
            [1, 0, 1, 1],
        ],
        // Level 20
        [
            [0, 0, 0, 0],
            [0, 1, 0, 1],
            [0, 0, 1, 1],
        ],
        // Level 21
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [1, 1, 1, 0],
        ],
        // Level 22
        [
            [0, 1, 0, 1, 1],
            [0, 1, 0, 1, 0],
            [1, 1, 0, 0, 1],
            [0, 1, 0, 0, 1],
            [0, 0, 1, 0, 1],
        ],
        // Level 23
        [
            [0, 1, 1, 1, 1],
            [1, 0, 1, 1, 0],
            [1, 0, 1, 1, 0],
        ],
        // Level 24
        [
            [0, 1, 1],
            [0, 0, 1],
            [1, 0, 0],
        ],
        // Level 25
        [
            [1, 0, 0],
            [0, 0, 0],
            [1, 1, 0],
        ],
        // Level 26
        [
            [0, 0, 1, 1],
            [0, 0, 0, 0],
            [1, 1, 0, 1],
            [1, 0, 1, 1],
            [1, 1, 1, 1],
        ],
        // Level 27
        [
            [1, 0, 0, 0],
            [1, 0, 0, 1],
            [1, 1, 1, 0],
        ],
        // Level 28
        [
            [1, 1, 0, 1, 0],
            [0, 0, 1, 0, 0],
            [1, 0, 1, 0, 0],
        ],
        // Level 29
        [
            [0, 1, 1, 0],
            [1, 1, 0, 1],
            [1, 0, 1, 1],
            [1, 0, 1, 0],
            [0, 0, 0, 1],
        ],
        // Level 30
        [
            [1, 1, 1, 0, 1],
            [0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1],
            [0, 0, 1, 0, 1],
            [1, 0, 0, 0, 1],
        ],
        // Level 31
        [
            [1, 0, 1],
            [0, 0, 0],
            [0, 0, 1],
        ],
        // Level 32
        [
            [1, 0, 1, 0, 1],
            [1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1],
            [0, 1, 1, 1, 1],
            [1, 0, 0, 0, 1],
        ],
        // Level 33
        [
            [0, 1, 1, 0, 1],
            [0, 0, 1, 0, 1],
            [1, 1, 0, 1, 1],
        ],
        // Level 34
        [
            [1, 1, 1, 0],
            [0, 1, 0, 1],
            [0, 1, 0, 0],
            [1, 1, 0, 1],
            [0, 1, 0, 1],
        ],
        // Level 35
        [
            [0, 1, 0, 0, 1],
            [0, 0, 1, 0, 0],
            [1, 1, 0, 1, 0],
        ],
        // Level 36
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [1, 1, 1, 1],
        ],
        // Level 37
        [
            [0, 1, 1],
            [0, 0, 1],
            [1, 0, 1],
        ],
        // Level 38
        [
            [1, 1, 1],
            [1, 1, 0],
            [1, 1, 1],
        ],
        // Level 39
        [
            [0, 0, 1, 1],
            [1, 0, 0, 0],
            [0, 0, 0, 1],
        ],
        // Level 40
        [
            [1, 0, 0],
            [0, 1, 1],
            [0, 1, 1],
            [1, 0, 1],
        ],
        // Level 41
        [
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0],
            [1, 0, 0, 1],
        ],
        // Level 42
        [
            [0, 1, 0, 0],
            [1, 0, 1, 1],
            [1, 0, 1, 1],
            [0, 0, 0, 0],
            [1, 0, 0, 1],
        ],
        // Level 43
        [
            [0, 0, 1, 1],
            [0, 0, 1, 1],
            [0, 0, 0, 1],
        ],
        // Level 44
        [
            [0, 1, 0, 0, 0],
            [0, 1, 0, 1, 1],
            [0, 1, 1, 1, 1],
        ],
        // Level 45
        [
            [0, 0, 0, 1, 0],
            [0, 0, 1, 0, 1],
            [0, 1, 0, 0, 0],
            [0, 0, 1, 0, 1],
        ],
        // Level 46
        [
            [1, 1, 1],
            [1, 0, 1],
            [0, 0, 0],
            [0, 0, 1],
        ],
        // Level 47
        [
            [0, 1, 0, 0, 1],
            [1, 1, 0, 0, 1],
            [1, 0, 1, 0, 0],
            [1, 0, 1, 0, 1],
        ],
        // Level 48
        [
            [0, 1, 0, 1, 1],
            [1, 0, 0, 1, 0],
            [1, 1, 0, 0, 1],
            [0, 0, 0, 0, 0],
            [0, 1, 0, 0, 1],
        ],
        // Level 49
        [
            [1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [0, 0, 1, 1, 0],
        ],
        // Level 50
        [
            [0, 0, 1, 1],
            [0, 0, 1, 1],
            [0, 1, 0, 1],
            [0, 0, 1, 0],
        ],
        // Level 51
        [
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 0],
            [0, 1, 1],
        ],
        // Level 52
        [
            [0, 0, 0, 0],
            [0, 0, 1, 1],
            [1, 0, 0, 0],
        ],
        // Level 53
        [
            [0, 1, 0, 0],
            [0, 0, 1, 1],
            [1, 0, 0, 0],
            [0, 1, 1, 1],
            [0, 1, 0, 0],
        ],
        // Level 54
        [
            [1, 0, 0],
            [0, 1, 1],
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 1],
        ],
        // Level 55
        [
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 1],
        ],
        // Level 56
        [
            [0, 0, 0],
            [1, 1, 0],
            [0, 0, 0],
        ],
        // Level 57
        [
            [0, 1, 0, 0],
            [1, 1, 1, 1],
            [1, 0, 0, 0],
            [0, 1, 1, 1],
        ],
        // Level 58
        [
            [0, 0, 1, 0],
            [1, 0, 1, 1],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
            [0, 1, 0, 1],
        ],
        // Level 59
        [
            [1, 1, 0, 1],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
        ],
        // Level 60
        [
            [0, 0, 0],
            [0, 1, 1],
            [0, 1, 0],
            [0, 1, 0],
            [0, 0, 0],
        ],
        // Level 61
        [
            [0, 0, 0, 1, 0],
            [0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1],
        ],
        // Level 62
        [
            [0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0],
            [0, 1, 1, 1, 1],
            [0, 0, 0, 0, 1],
        ],
        // Level 63
        [
            [0, 0, 1, 0],
            [0, 1, 1, 1],
            [0, 0, 1, 0],
        ],
        // Level 64
        [
            [0, 1, 1, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 0, 0, 1],
        ],
        // Level 65
        [
            [1, 0, 1],
            [0, 0, 1],
            [0, 1, 1],
            [0, 0, 0],
        ],
        // Level 66
        [
            [1, 0, 1, 1],
            [1, 1, 1, 0],
            [0, 0, 1, 0],
            [1, 0, 1, 1],
            [1, 0, 0, 0],
        ],
        // Level 67
        [
            [0, 1, 0, 0, 0],
            [1, 0, 1, 0, 0],
            [1, 0, 1, 0, 0],
            [0, 1, 1, 0, 1],
        ],
        // Level 68
        [
            [0, 1, 0, 1, 1],
            [1, 0, 0, 1, 1],
            [0, 1, 0, 1, 0],
            [0, 0, 1, 0, 0],
        ],
        // Level 69
        [
            [1, 0, 0, 0, 1],
            [0, 0, 1, 0, 1],
            [0, 0, 0, 1, 1],
            [1, 0, 0, 0, 1],
        ],
        // Level 70
        [
            [1, 0, 0],
            [0, 0, 1],
            [0, 1, 1],
            [1, 0, 1],
            [1, 1, 1],
        ],
        // Level 71
        [
            [0, 1, 1, 1],
            [1, 0, 1, 0],
            [1, 1, 0, 1],
            [0, 1, 1, 0],
            [1, 0, 1, 0],
        ],
        // Level 72
        [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0],
        ],
        // Level 73
        [
            [1, 0, 0, 1],
            [1, 1, 1, 1],
            [1, 0, 0, 1],
        ],
        // Level 74
        [
            [0, 0, 0, 1, 1],
            [0, 0, 0, 0, 0],
            [0, 1, 0, 1, 1],
            [0, 1, 1, 0, 1],
            [1, 1, 1, 1, 0],
        ],
        // Level 75
        [
            [0, 1, 1, 0, 0],
            [0, 1, 1, 1, 0],
            [1, 0, 1, 1, 1],
            [0, 1, 0, 0, 0],
        ],
        // Level 76
        [
            [0, 1, 0, 1],
            [1, 0, 1, 0],
            [0, 1, 0, 0],
        ],
        // Level 77
        [
            [1, 1, 0, 1, 1],
            [0, 1, 0, 0, 0],
            [0, 1, 1, 0, 1],
        ],
        // Level 78
        [
            [0, 1, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 1],
            [1, 0, 1, 0],
        ],
        // Level 79
        [
            [0, 0, 1, 1],
            [0, 0, 1, 0],
            [1, 1, 1, 1],
        ],
        // Level 80
        [
            [1, 0, 1],
            [1, 0, 0],
            [0, 0, 1],
        ],
        // Level 81
        [
            [0, 0, 0, 0, 1],
            [0, 1, 1, 1, 1],
            [0, 0, 1, 1, 1],
            [1, 0, 1, 0, 0],
            [1, 1, 0, 0, 1],
        ],
        // Level 82
        [
            [1, 0, 1, 1, 1],
            [1, 0, 0, 0, 0],
            [0, 1, 1, 0, 1],
            [0, 0, 1, 1, 1],
            [0, 0, 1, 1, 1],
        ],
        // Level 83
        [
            [0, 1, 0, 0, 1],
            [1, 1, 0, 0, 1],
            [0, 1, 1, 1, 0],
            [1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1],
        ],
        // Level 84
        [
            [1, 1, 1],
            [1, 0, 0],
            [0, 1, 0],
            [0, 1, 1],
            [0, 1, 0],
        ],
        // Level 85
        [
            [0, 0, 1, 1, 1],
            [1, 1, 1, 1, 0],
            [1, 0, 1, 0, 0],
            [0, 0, 1, 1, 1],
        ],
        // Level 86
        [
            [0, 0, 1, 0, 0],
            [0, 1, 1, 0, 1],
            [1, 1, 1, 1, 0],
        ],
        // Level 87
        [
            [1, 0, 1, 1, 0],
            [0, 1, 1, 0, 1],
            [1, 1, 1, 0, 0],
            [0, 0, 1, 1, 0],
        ],
        // Level 88
        [
            [0, 0, 1, 0],
            [1, 0, 0, 0],
            [1, 1, 0, 1],
        ],
        // Level 89
        [
            [1, 0, 1, 0],
            [0, 0, 0, 1],
            [0, 0, 0, 1],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
        ],
        // Level 90
        [
            [0, 0, 1, 1, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 1, 1],
            [0, 1, 0, 0, 1],
        ],
        // Level 91
        [
            [0, 0, 1, 1, 0],
            [1, 1, 1, 0, 1],
            [0, 0, 1, 0, 1],
            [1, 1, 1, 1, 1],
        ],
        // Level 92
        [
            [0, 1, 1],
            [0, 0, 1],
            [0, 0, 1],
        ],
        // Level 93
        [
            [0, 1, 1, 1],
            [1, 0, 1, 0],
            [0, 0, 1, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 1],
        ],
        // Level 94
        [
            [0, 1, 0],
            [0, 0, 0],
            [1, 0, 1],
            [1, 1, 1],
            [0, 1, 0],
        ],
        // Level 95
        [
            [1, 0, 0, 0],
            [1, 0, 1, 0],
            [1, 0, 0, 1],
            [1, 0, 0, 1],
        ],
        // Level 96
        [
            [1, 1, 0],
            [1, 0, 1],
            [0, 0, 1],
        ],
        // Level 97
        [
            [1, 1, 1, 0],
            [0, 0, 0, 1],
            [0, 0, 0, 1],
            [0, 0, 1, 0],
        ],
        // Level 98
        [
            [1, 1, 0, 0, 0],
            [0, 1, 0, 1, 1],
            [1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0],
        ],
        // Level 99
        [
            [0, 0, 0, 0],
            [0, 0, 0, 1],
            [1, 0, 0, 1],
            [0, 1, 0, 1],
            [0, 1, 0, 1],
        ],
        // Level 100
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [1, 0, 1, 1],
            [0, 0, 0, 1],
        ],
    ];
    



function initializeBlocks(){
    // отримати рівень 
    let currentLevel = levels[levelNumber-1];
    let y_cord = 20
    console.log(currentLevel)
    // створити стільки рядків, скільки списків у рівні
    for (let j = 0; j < currentLevel.length; j++){
        y_cord += 60
        x_box(currentLevel[j], y_cord)
    }
}
    
function x_box(levelRow, y_cord){
    let x_cord = 75;
    for (let i = 0; i < levelRow.length; i++){
    if (levelRow[i] == 1)
    blocks.push({x:x_cord, y:y_cord , width: 80, height: 30 })
        x_cord += 90
        
    }
}




const blocks = []
let move = 0
let speed = 5
let yspeed = 6

function handlemouse(event){ 
    if(event.offsetX >= 10 && event.offsetX + 140 <= canvas.width)
    move = event.offsetX
}
function deletecount(){
    blocksdestroyed = 0
    paragraph.innerHTML = 'blocks destroyed: 0'
}
function next_level(){
    if (levelNumber < levels.length){
    blocks.length = 0
    levelNumber += 1
    initializeBlocks()
    }
}    
function previous_level(){
        if (levelNumber > 0){
        blocks.length = 0
        levelNumber -= 1
        initializeBlocks()
        }
    }
left.addEventListener('click', previous_level)
right.addEventListener('click', next_level)
button.addEventListener('click', deletecount)
canvas.addEventListener('mousemove', handlemouse)

// створити змінну i = 0, повторювати наступні команди, поки *якась умова*, кожного разу збільшую і

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
        ballY + ballHeight >= blockY && 
        ballY <= blockY + blockHeight && 
        ballX + ballWidth >= blockX && 
        ballX <= blockX + blockWidth 
    );
}

let blocksdestroyed = +localStorage.getItem('kluch') ;
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(x, y); 
    drawrect(move); 
    drawBlocks(); 
  
    x += speed;
    y += yspeed;

  
    if (x + 20 >= canvas.width || x - 20 <= 0) speed *= -1;
    if (y + 20 >= canvas.height || y - 20 <= 0) yspeed *= -1;

    
    if (y + 20 >= 600 && x >= move && x <= move + 140) {
        yspeed *= -1;
        y = 580; 
    }
    if (y + 20 > 600 ) {
        blocksdestroyed = 0; 
        y = 400
        yspeed *= -1   
        paragraph.innerHTML = 'blocks destroyed: ' + blocksdestroyed;
    }
    if (blocks.length == 0){
    initializeBlocks()
    }
    
    for (const block of blocks) {
        if (touchBlock(x, y, 20, 20, block.x, block.y, block.width, block.height)) {
            yspeed *= -1;
            blocks.splice(blocks.indexOf(block), 1); 
            blocksdestroyed += 1; 
            localStorage.setItem('kluch', blocksdestroyed); 
            paragraph.innerHTML = 'blocks destroyed: ' + blocksdestroyed; 
            break; 
        }
    }
}


setInterval(draw, 1000 / 60)

    