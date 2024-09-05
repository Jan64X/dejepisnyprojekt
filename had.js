const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('start-button');
const gameOverPopup = document.getElementById('game-over-popup');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');
const boardSize = 300;
const gridSize = 10;
let snake = [];
let food = {};
let direction = 'right';
let score = 0;
let gameLoop;

function initGame() {
    snake = [{ x: 150, y: 150 }];
    direction = 'right';
    score = 0;
    scoreElement.textContent = 'Score: 0';
    createFood();
    drawGame();
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * (boardSize / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (boardSize / gridSize)) * gridSize
    };
}

function drawGame() {
    gameBoard.innerHTML = '';
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.left = `${segment.x}px`;
        snakeElement.style.top = `${segment.y}px`;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });

    const foodElement = document.createElement('div');
    foodElement.style.left = `${food.x}px`;
    foodElement.style.top = `${food.y}px`;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function moveSnake() {
    const head = { ...snake[0] };
    switch (direction) {
        case 'up': head.y -= gridSize; break;
        case 'down': head.y += gridSize; break;
        case 'left': head.x -= gridSize; break;
        case 'right': head.x += gridSize; break;
    }

    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
        gameOver();
        return;
    }

    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        createFood();
        score++;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        snake.pop();
    }

    drawGame();
}

function gameOver() {
    clearInterval(gameLoop);
    finalScoreElement.textContent = `Your score: ${score}`;
    gameOverPopup.style.display = 'flex';
    console.log(`had vzdechnul`)
}

function startGame() {
    initGame();
    startButton.style.display = 'none';
    gameOverPopup.style.display = 'none';
    gameLoop = setInterval(moveSnake, 100);
    console.log(`obézní had se začal hýbat`)
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp': if (direction !== 'down') direction = 'up'; break;
        case 'ArrowDown': if (direction !== 'up') direction = 'down'; break;
        case 'ArrowLeft': if (direction !== 'right') direction = 'left'; break;
        case 'ArrowRight': if (direction !== 'left') direction = 'right'; break;
    }
});

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

initGame(); // Initialize the game board without starting the game loop
gameOverPopup.style.display = 'none'; // Hide the popup initially