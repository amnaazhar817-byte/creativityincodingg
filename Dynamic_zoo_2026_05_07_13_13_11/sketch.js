function setup() {
  createCanvas(500, 550);
}

function draw() {
  drawSpace();

  drawShip(130, 120);
  drawShip(580, 160);
  drawShip(350, 90);

  let floatY = sin(frameCount * 0.05) * 8;

  push();
  translate(width / 2, height / 2 + 80 + floatY);
  drawCuteAlien();
  pop();
}

function drawSpace() {
  background(8, 15, 45);

  for (let i = 0; i < 120; i++) {
    fill(255);
    noStroke();
    circle(random(width), random(height), random(1, 2));
  }

  noStroke();
  fill(80, 255, 200, 40);
  ellipse(width/2, height/2 + 120, 300, 260);
}

function drawShip(x, y) {
  let hover = sin(frameCount * 0.07 + x) * 5;

  push();
  translate(x, y + hover);

  noStroke();
  for (let i = 0; i < 6; i++) {
    fill(120, 255, 200, 30 - i * 4);
    triangle(
      -25 - i * 6, 10,
       25 + i * 6, 10,
       0, 140 + i * 12
    );
  }

  fill(180);
  ellipse(0, 0, 90, 30);

  fill(140, 210, 255, 140);
  ellipse(0, -10, 50, 25);

  fill(255, 230, 120);
  circle(-25, 6, 6);
  circle(0, 8, 6);
  circle(25, 6, 6);

  pop();
}

function drawCuteAlien() {

  let bodyColor = color(90, 230, 200);

  stroke(bodyColor);
  strokeWeight(10);
  line(-15, 80, -15, 130);
  line(15, 80, 15, 130);

  noStroke();
  fill(bodyColor);
  ellipse(-15, 140, 28, 12);
  ellipse(15, 140, 28, 12);

  ellipse(0, 50, 70, 90);

  stroke(bodyColor);
  strokeWeight(8);
  line(-35, 40, -55, 80);
  line(35, 40, 55, 80);

  noStroke();
  fill(bodyColor);
  ellipse(0, -20, 130, 120);

  stroke(bodyColor);
  strokeWeight(5);
  line(-25, -70, -35, -105);
  line(25, -70, 35, -105);

  noStroke();
  fill(255);
  circle(-35, -110, 10);
  circle(35, -110, 10);

  fill(255);
  ellipse(-30, -25, 28, 32);
  ellipse(30, -25, 28, 32);

  fill(0);
  circle(-28, -20, 10);
  circle(32, -20, 10);

  fill(255);
  circle(-31, -24, 4);
  circle(29, -24, 4);

  stroke(0);
  strokeWeight(3);
  noFill();
  arc(0, 5, 40, 20, 0, PI);
}