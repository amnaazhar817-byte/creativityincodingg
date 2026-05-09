let waves = [];
let particles = [];
let player;
let objects = [];
let score = 0;
let lives = 3;

let gameState = "start";

let bgMusic;

function preload() {
  bgMusic = loadSound("music.mp3");
}

function setup() {
  createCanvas(900, 550);

  for (let i = 0; i < 5; i++) waves.push(new Wave(i * 30));
  for (let i = 0; i < 25; i++) particles.push(new Particle());

  player = new Player();
}

function draw() {
  if (gameState === "start") startScreen();
  else if (gameState === "play") runGame();
  else if (gameState === "gameover") gameOverScreen();
}

function startScreen() {
  drawBackground();

  textAlign(CENTER, CENTER);

  let pulse = sin(frameCount * 0.05) * 10;

  fill(0, 255, 200, 40);
  textSize(110 + pulse);
  textStyle(BOLD);
  text("NEON DROP", width / 2, height / 2 - 60);

  fill(0, 255, 200, 80);
  textSize(95 + pulse * 0.5);
  text("NEON DROP", width / 2, height / 2 - 60);

  fill(0, 255, 200);
  textSize(85);
  text("NEON DROP", width / 2, height / 2 - 60);

  fill(255);
  textSize(20);
  textStyle(NORMAL);
  text("Catch the glowing orbs", width / 2, height / 2 + 10);

  drawButton("PLAY", width / 2, height / 2 + 90);
}

function runGame() {
  if (lives <= 0) {
    gameState = "gameover";

    if (bgMusic.isPlaying()) bgMusic.stop();

    return;
  }

  drawBackground();

  player.update();
  player.show();

  if (frameCount % 50 === 0) {
    objects.push(new FallingObject());
  }

  for (let i = objects.length - 1; i >= 0; i--) {
    objects[i].update();
    objects[i].show();

    if (objects[i].hits(player)) {
      score++;
      objects.splice(i, 1);
    } else if (objects[i].offScreen()) {
      lives--;
      objects.splice(i, 1);
    }
  }

  fill(0, 255, 200);
  textSize(22);
  textAlign(LEFT);
  text("Score: " + score, 20, 30);
  text("Lives: " + lives, 20, 55);
}

function gameOverScreen() {
  drawBackground();

  textAlign(CENTER, CENTER);

  let pulse = sin(frameCount * 0.08) * 8;

  fill(255, 255, 255, 60);
  textSize(100 + pulse);
  textStyle(BOLD);
  text("GAME OVER", width / 2, height / 2 - 50);

  fill(255);
  textSize(75);
  text("GAME OVER", width / 2, height / 2 - 50);

  fill(0, 255, 200, 120);
  textSize(78);
  text("GAME OVER", width / 2, height / 2 - 50);

  fill(255);
  textSize(26);
  textStyle(NORMAL);
  text("Final Score: " + score, width / 2, height / 2 + 30);

  drawButton("RESTART", width / 2, height / 2 + 110);
}

function drawButton(label, x, y) {
  rectMode(CENTER);
  noStroke();

  let pulse = sin(frameCount * 0.1) * 10;

  fill(0, 255, 200, 80);
  rect(x, y, 230 + pulse, 80 + pulse, 25);

  fill(0, 255, 200);
  rect(x, y, 200, 60, 20);

  fill(0);
  textSize(28);
  text(label, x, y);
}

function drawBackground() {
  background(10, 5, 30);

  stroke(60, 30);
  for (let x = 0; x < width; x += 60) line(x, 0, x, height);
  for (let y = 0; y < height; y += 60) line(0, y, width, y);

  for (let w of waves) {
    w.update();
    w.show();
  }

  for (let p of particles) {
    p.update();
    p.show();
  }
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 40;
    this.w = 120;
    this.h = 15;
  }

  update() {
    this.x = mouseX;
  }

  show() {
    rectMode(CENTER);
    noStroke();

    fill(0, 255, 200, 60);
    rect(this.x, this.y, this.w + 30, this.h + 15, 15);

    fill(0, 255, 200);
    rect(this.x, this.y, this.w, this.h, 10);
  }
}

class FallingObject {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.r = random(14, 20);
    this.speed = random(4, 7);

    this.color = color(
      random([255, 0]),
      random([255, 150]),
      255
    );
  }

  update() {
    this.y += this.speed;
  }

  show() {
    noStroke();

    fill(red(this.color), green(this.color), blue(this.color), 80);
    ellipse(this.x, this.y, this.r * 3);

    fill(255);
    ellipse(this.x, this.y, this.r * 1.5);
  }

  hits(player) {
    return (
      this.x > player.x - player.w / 2 &&
      this.x < player.x + player.w / 2 &&
      this.y > player.y - player.h / 2
    );
  }

  offScreen() {
    return this.y > height;
  }
}

class Wave {
  constructor(offset) {
    this.offset = offset;
    this.speed = random(0.01, 0.02);

    this.color = color(
      random(100, 200),
      random(100, 200),
      255,
      120
    );
  }

  update() {
    this.offset += this.speed * 10;
  }

  show() {
    stroke(this.color);
    strokeWeight(1.5);
    noFill();

    beginShape();
    for (let x = 0; x < width; x += 15) {
      let y =
        sin(x * 0.01 + this.offset) * 15 +
        height / 2 +
        this.offset;
      vertex(x, y);
    }
    endShape();
  }
}

class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(5, 15);
    this.speed = random(0.2, 0.8);
    this.alpha = random(50, 120);
  }

  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }

  show() {
    noStroke();
    fill(255, this.alpha);
    ellipse(this.x, this.y, this.size);
  }
}

function mousePressed() {
  if (gameState === "start") {
    gameState = "play";

    if (!bgMusic.isPlaying()) {
      bgMusic.setVolume(0.4);
      bgMusic.loop();
    }

  } else if (gameState === "gameover") {
    score = 0;
    lives = 3;
    objects = [];

    gameState = "start";
  }
}