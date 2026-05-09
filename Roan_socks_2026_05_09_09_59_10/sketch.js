let particles = [];
const numParticles = 1000;
const noiseScale = 0.01;

let textAlpha = 0;
const delayTime = 3000;
const fadeDuration = 2000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  strokeJoin(ROUND);
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }

  background(10, 10, 25);
}
function draw() {
  background(10, 10, 25, 15);

  let currentTime = millis();

  if (currentTime > delayTime) {
    let fadeProgress = (currentTime - delayTime) / fadeDuration;
    textAlpha = lerp(0, 255, min(fadeProgress, 1));
  }

  let floatOffset = sin(frameCount * 0.02) * 12;

  textFont("Georgia");
  textStyle(BOLD);
  textAlign(CENTER, CENTER);

  let titleSize = min(width * 0.15, height * 0.15); 
  let lineHeight = titleSize * 0.85;
  let startY = height / 2 - lineHeight;

  drawWelcomeText(
    "WELCOME TO",
    width / 2,
    startY + floatOffset,
    titleSize * 0.75
  );
  drawBrightFutureText(
    "BRIGHT FUTURE",
    width / 2,
    height / 2 + floatOffset,
    titleSize
  );

  drawTrainingCenterText(
    "TRAINING CENTER",
    width / 2,
    height / 2 + lineHeight + floatOffset,
    titleSize * 0.75
  );

  for (let p of particles) {
    p.move();
    p.display();
    p.checkEdge();
  }
}

function drawWelcomeText(txt, x, y, size) {
  textSize(size);
  noStroke();
  fill(255, 200, 0, textAlpha * 0.8); 
  text(txt, x + 4, y + 4);

  fill(160, 0, 20, textAlpha);
  stroke(255, textAlpha);
  strokeWeight(2);
  text(txt, x, y);
}

function drawBrightFutureText(txt, x, y, size) {
  textSize(size);
  noStroke();
  fill(180, 120, 0, textAlpha * 0.8); 
  text(txt, x + 5, y + 5);

  fill(255, 220, 0, textAlpha);
  stroke(255, textAlpha);
  strokeWeight(2.5);
  text(txt, x, y);
}

function drawTrainingCenterText(txt, x, y, size) {
  textSize(size);
  fill(255, 235, 220, textAlpha);
  stroke(0, textAlpha);
  strokeWeight(3);
  text(txt, x, y);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(10, 10, 25); 
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = random(1.5, 3.0); 
  
    this.colorRed = color(255, 20, 0);
    this.colorYellow = color(255, 230, 0);
  }

  move() {
    let angle = noise(
      this.pos.x * noiseScale,
      this.pos.y * noiseScale,
      frameCount * 0.01
    ) * TWO_PI * 2;

    this.acc = p5.Vector.fromAngle(angle);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
  }

  display() {
    let colorNoise = noise(this.pos.x * 0.005, this.pos.y * 0.005, frameCount * 0.01);
    let particleColor = lerpColor(this.colorRed, this.colorYellow, colorNoise);
    
    stroke(red(particleColor), green(particleColor), blue(particleColor), 120);
    strokeWeight(1.5);
    
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x - this.vel.x * 2,
      this.pos.y - this.vel.y * 2
    );
  }
  checkEdge() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
}