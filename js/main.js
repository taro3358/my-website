import Dino from './dino.js';
import Obstacle from './obstacle.js';
import Bird from './bird.js';

let dino;
let obstacles = [];
let score = 0;
let highScore = 0;
let lives = 3;
let gameOver = false;
let gameSpeed = 6;

// DOM Elements
let scoreElem, highscoreElem, gameOverMessage, livesElem;

// Make p5.js functions global
window.setup = function() {
    let canvas = createCanvas(600, 300);
    canvas.parent('canvas-container');
    
    scoreElem = select('#score');
    highscoreElem = select('#highscore');
    gameOverMessage = select('#game-over-message');
    livesElem = select('#lives');

    resetGame();
}

window.draw = function() {
    background(247);
    stroke(83);
    strokeWeight(2);
    line(0, height, width, height);

    if (gameOver) return;

    score++;
    scoreElem.html('Score: ' + score);

    if (score > 0 && score % 100 === 0) gameSpeed += 0.25;

    const baseSpawnRate = 0.015;
    const spawnRateIncrease = score * 0.0000005;
    let spawnRate = baseSpawnRate + spawnRateIncrease;
    spawnRate = min(spawnRate, 0.05);

    if (random(1) < spawnRate && frameCount > 60) {
        if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < width - 250) {
            if (random(1) < 0.3 && score > 500) {
                obstacles.push(new Bird());
            } else {
                obstacles.push(new Obstacle());
            }
        }
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].update(gameSpeed);
        obstacles[i].show();

        if (dino.hits(obstacles[i]) && !dino.invincible) {
            handleHit(); // Call handleHit first
            obstacles.splice(i, 1); // Then remove the obstacle
        }

        if (obstacles[i].x < -obstacles[i].w) {
            obstacles.splice(i, 1);
        }
    }

    dino.update();
    dino.show();
}

window.keyPressed = function() {
    if (key === ' ') {
        if (gameOver) {
            resetGame();
        } else {
            dino.jump();
        }
    }
}

// --- Game State Functions ---
function handleHit() {
    lives--;
    livesElem.html('Lives: ' + lives);
    dino.invincible = true;
    dino.invincibleTimer = 120; // 2 seconds of invincibility

    if (lives <= 0) {
        endGame();
    }
}

function resetGame() {
    score = 0;
    lives = 3;
    gameSpeed = 6;
    obstacles = [];
    dino = new Dino();
    gameOver = false;
    
    scoreElem.html('Score: ' + score);
    livesElem.html('Lives: ' + lives);
    gameOverMessage.addClass('hidden');
    loop();
}

function endGame() {
    if (score > highScore) {
        highScore = score;
        highscoreElem.html('High: ' + highScore);
    }
    gameOver = true;
    gameOverMessage.removeClass('hidden');
    noLoop();
}