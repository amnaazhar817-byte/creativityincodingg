let song;
let fft;
let particles = [];
let img;

function preload() {
  song = loadSound('music.mp3.mp3'); 
  img = loadImage('space.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  imageMode(CENTER);
  rectMode(CENTER);
  img.filter(BLUR, 3);
  fft = new p5.FFT(0.8);
}
function draw() {
  background(0);
  
  fft.analyze();
  // Renamed 'amp' to 'bassLevel' to avoid reserved function errors
  let bassLevel = fft.getEnergy(20, 200); 

  // 1. Responsive Background
  push();
  translate(width / 2, height / 2);
  if (bassLevel > 230) {
    rotate(random(-1, 1));
  }
  image(img, 0, 0, width + 100, height + 100);
  pop();

  // 2. Alpha Layer
  let alpha = map(bassLevel, 0, 255, 180, 100);
  fill(0, alpha);
  noStroke();
  rect(width / 2, height / 2, width, height);

  // 3. Circular Waveform
  translate(width / 2, height / 2);
  stroke(255);
  strokeWeight(3);
  noFill();

  let wave = fft.waveform();

  for (let t = -1; t <= 1; t += 2) {
    beginShape();
    for (let i = 0; i <= 180; i += 2) {
      let index = floor(map(i, 0, 180, 0, wave.length - 1));
      let r = map(wave[index], -1, 1, 150, 350);
      let x = r * sin(i) * t;
      let y = r * cos(i);
      vertex(x, y);
    }
    endShape();
  }

  // 4. Particle System
  let p = new Particle();
  particles.push(p);

  for (let i = particles.length - 1; i >= 0; i--) {
    if (!particles[i].edges()) {
      // Pass the new variable name here
      particles[i].update(bassLevel > 230);
      particles[i].show();
    } else {
      particles.splice(i, 1);
    }
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
    noLoop();
  } else {
    song.play();
    loop();
  }
}

class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(250);
    this.vel = createVector(0, 0);
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001));
    this.w = random(3, 5);
    this.color = [random(100, 255), random(100, 255), random(255)];
  }
  update(cond) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    if (cond) {
      this.pos.add(this.vel);
      this.pos.add(this.vel);
    }
  }
  edges() {
    return (this.pos.x < -width / 2 || this.pos.x > width / 2 || 
            this.pos.y < -height / 2 || this.pos.y > height / 2);
  }
  show() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.w);
  }
}