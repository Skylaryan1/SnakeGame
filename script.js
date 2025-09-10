const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const finalScore = document.getElementById('finalScore');
const speedBtns = document.querySelectorAll('.speed-btn');

let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
}

let score = 0;
let d;

document.addEventListener('keydown', direction);

function direction(event) {
    if (event.keyCode == 37 && d != 'RIGHT') {
        d = 'LEFT';
    } else if (event.keyCode == 38 && d != 'DOWN') {
        d = 'UP';
    } else if (event.keyCode == 39 && d != 'LEFT') {
        d = 'RIGHT';
    } else if (event.keyCode == 40 && d != 'UP') {
        d = 'DOWN';
    }
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? 'green' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = 'red';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == 'LEFT') snakeX -= box;
    if (d == 'UP') snakeY -= box;
    if (d == 'RIGHT') snakeX += box;
    if (d == 'DOWN') snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        }
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        gameOverScreen.style.display = 'block';
        finalScore.innerText = score;
        canvas.style.display = 'none';
        return;
    }

    snake.unshift(newHead);

    ctx.fillStyle = 'black';
    ctx.font = '45px Changa one';
    ctx.fillText(score, 2 * box, 1.6 * box);
}

let game;
let gameSpeed = 100; // Default speed

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

speedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        speedBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        gameSpeed = parseInt(btn.dataset.speed);
    });
});

function startGame() {
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    canvas.style.display = 'block';

    snake = [{ x: 9 * box, y: 10 * box }];
    d = undefined;
    score = 0;

    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };

    if (game) {
        clearInterval(game);
    }
    game = setInterval(draw, gameSpeed);
}