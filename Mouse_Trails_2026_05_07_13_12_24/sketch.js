let points = [];
function setup() {
  createCanvas(600, 400); 
  background(0);
  noFill();
  strokeWeight(2);
}
function draw() {
  fill(0, 25);
  rect(0, 0, width, height);

  points.push({
    x: mouseX,
    y: mouseY,
    angle: random(TWO_PI),
    radius: random(15, 35),
    color1: color(255), 
    color2: color(0, 255, 255) 
  });

  for (let i = points.length - 1; i >= 0; i--) {
    let p = points[i];

    for (let j = 0; j < 5; j++) {
      let r = p.radius + j * 5;
      if (j % 2 === 0) {
        stroke(p.color1.levels[0], p.color1.levels[1], p.color1.levels[2], 150);
      } else {
        stroke(p.color2.levels[0], p.color2.levels[1], p.color2.levels[2], 150);
      }
      ellipse(p.x + sin(p.angle + j * 0.3) * 10, p.y + cos(p.angle + j * 0.3) * 10, r, r);
    }

    p.angle += 0.05;

    if (points.length > 150) {
      points.splice(0, 1);
    }
  }
  stroke(255);
  strokeWeight(4);
  point(mouseX, mouseY);
}