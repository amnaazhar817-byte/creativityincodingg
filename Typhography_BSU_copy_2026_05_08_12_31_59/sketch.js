let particles = [];

function setup() {
  createCanvas(600, 600);

  textFont("Impact");
  textAlign(CENTER, CENTER);

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      s: random(2, 5),
      speed: random(0.4, 1.2)
    });
  }
}

function draw() {
  drawBackground();
  push();

  translate(width / 2, height / 2);

  drawSunRays();

  drawEagle();
  drawParticles();
  let floatY = sin(frameCount * 0.05) * 5;
  drawStyledText(
    "BFTC",
    0,
    -35 + floatY,
    190,
    color(180, 20, 30),
    color(255, 210, 0)
  );
  drawStyledText(
    "BRIGHT FUTURE",
    0,
    70 + floatY,
    52,
    color(255, 210, 0),
    color(255, 230, 100)
  );
  drawStyledText(
    "TRAINING CENTER",
    0,
    120 + floatY,
    36,
    color(255, 220, 160),
    color(255, 210, 0)
  );

  pop();
}

function drawBackground() {

  for (let y = 0; y < height; y++) {

    let inter = map(y, 0, height, 0, 1);

    let c = lerpColor(
      color(5, 0, 0),
      color(70, 0, 10),
      inter
    );

    stroke(c);

    line(0, y, width, y);
  }
}

function drawSunRays() {
  push();
  rotate(frameCount * 0.002);

  for (let i = 0; i < 24; i++) {
    rotate(TWO_PI / 24);
    noStroke();
    fill(255, 210, 0, 35);
    triangle(
      0, 0,
      -8, -220,
      8, -220
    );
  }

  pop();
}

function drawEagle() {

  push();

  scale(1.2);

  let flap = sin(frameCount * 0.04) * 8;

  fill(180, 20, 30, 45);

  noStroke();

  beginShape();

  vertex(-130, -25);
  vertex(-200, -80 - flap);
  vertex(-260, -45);
  vertex(-225, 10);
  vertex(-165, 30);
  vertex(-95, 0);

  endShape(CLOSE);

  beginShape();

  vertex(130, -25);
  vertex(200, -80 + flap);
  vertex(260, -45);
  vertex(225, 10);
  vertex(165, 30);
  vertex(95, 0);

  endShape(CLOSE);

  fill(255, 210, 0, 40);
  ellipse(0, -15, 75, 115);

  ellipse(0, -72, 40, 40)
  fill(255, 210, 0, 70);

  triangle(
    20, -76,
    48, -68,
    20, -58
  );

  pop();
}

function drawParticles() {
  push();
  translate(-width / 2, -height / 2);
  noStroke();

  for (let p of particles) {
    fill(255, 210, 0, 120);
    circle(
      p.x,
      p.y,
      p.s
    );

    p.y -= p.speed;

    if (p.y < 0) {

      p.y = height;
      p.x = random(width);
    }
  }

  pop();
}

function drawStyledText(
  txt,
  x,
  y,
  size,
  mainColor,
  glowColor
) {

  textSize(size);

  fill(
    red(glowColor),
    green(glowColor),
    blue(glowColor),
    80
  );

  for (let i = 0; i < 12; i++) {

    text(
      txt,
      x + i * 0.6,
      y + i * 0.6
    );
  }

  fill(255);
  stroke(0);
  strokeWeight(4);
  text(
    txt,
    x - 2,
    y - 2
  );

  noStroke();
  fill(mainColor);

  text(
    txt,
    x,
    y
  );
}