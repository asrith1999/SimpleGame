const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Paddle properties
const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 80;
const PADDLE_MARGIN = 10;

// Ball properties
const BALL_SIZE = 14;

// Game state
let leftPaddleY = HEIGHT / 2 - PADDLE_HEIGHT / 2;
let rightPaddleY = HEIGHT / 2 - PADDLE_HEIGHT / 2;
let ballX = WIDTH / 2 - BALL_SIZE / 2;
let ballY = HEIGHT / 2 - BALL_SIZE / 2;
let ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
let ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1);

// Mouse controls for left paddle
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseY = e.clientY - rect.top;
  leftPaddleY = mouseY - PADDLE_HEIGHT / 2;
  leftPaddleY = Math.max(0, Math.min(HEIGHT - PADDLE_HEIGHT, leftPaddleY));
});

// Draw paddles
function drawPaddle(x, y) {
  ctx.fillStyle = '#fff';
  ctx.fillRect(x, y, PADDLE_WIDTH, PADDLE_HEIGHT);
}

// Draw ball
function drawBall(x, y) {
  ctx.fillStyle = '#fff';
  ctx.fillRect(x, y, BALL_SIZE, BALL_SIZE);
}

// Draw net
function drawNet() {
  ctx.strokeStyle = "#fff";
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  ctx.moveTo(WIDTH / 2, 0);
  ctx.lineTo(WIDTH / 2, HEIGHT);
  ctx.stroke();
  ctx.setLineDash([]);
}

// Simple AI for right paddle
function moveAIPaddle() {
  // Follow the ball with some delay (change 0.07 for difficulty)
  const paddleCenter = rightPaddleY + PADDLE_HEIGHT / 2;
  if (paddleCenter < ballY) rightPaddleY += 4;
  else if (paddleCenter > ballY) rightPaddleY -= 4;
  // Stay within bounds
  rightPaddleY = Math.max(0, Math.min(HEIGHT - PADDLE_HEIGHT, rightPaddleY));
}

function resetBall() {
  ballX = WIDTH / 2 - BALL_SIZE / 2;
  ballY = HEIGHT / 2 - BALL_SIZE / 2;
  ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
  ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1);
}

function update() {
  // Move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Wall collision
  if (ballY <= 0 || ballY + BALL_SIZE >= HEIGHT) {
    ballSpeedY *= -1;
    ballY = ballY <= 0 ? 0 : HEIGHT - BALL_SIZE;
  }

  // Left paddle collision
  if (
    ballX <= PADDLE_MARGIN + PADDLE_WIDTH &&
    ballY + BALL_SIZE > leftPaddleY &&
    ballY < leftPaddleY + PADDLE_HEIGHT
  ) {
    ballSpeedX *= -1;
    // Add some vertical variation
    ballSpeedY += (ballY + BALL_SIZE/2 - leftPaddleY - PADDLE_HEIGHT/2) * 0.15;
    ballX = PADDLE_MARGIN + PADDLE_WIDTH;
  }

  // Right paddle collision
  if (
    ballX + BALL_SIZE >= WIDTH - PADDLE_MARGIN - PADDLE_WIDTH &&
    ballY + BALL_SIZE > rightPaddleY &&
    ballY < rightPaddleY + PADDLE_HEIGHT
  ) {
    ballSpeedX *= -1;
    ballSpeedY += (ballY + BALL_SIZE/2 - rightPaddleY - PADDLE_HEIGHT/2) * 0.15;
    ballX = WIDTH - PADDLE_MARGIN - PADDLE_WIDTH - BALL_SIZE;
  }

  // Score (ball out of bounds)
  if (ballX < 0 || ballX > WIDTH) {
    resetBall();
  }

  moveAIPaddle();
}

function draw() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  drawNet();
  drawPaddle(PADDLE_MARGIN, leftPaddleY); // Left Paddle (player)
  drawPaddle(WIDTH - PADDLE_MARGIN - PADDLE_WIDTH, rightPaddleY); // Right Paddle (AI)
  drawBall(ballX, ballY);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();