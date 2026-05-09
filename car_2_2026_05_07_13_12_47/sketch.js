function setup() {
  createCanvas(600, 400);
}

function draw() {
  drawSky();
  drawClouds();
  drawBuildings();
  drawRoad();
  drawCar();
}

function drawSky(){

  for(let y = 0; y < height; y++){
    let c = lerpColor(color(10,20,80), color(40,80,160), y/height);
    stroke(c);
    line(0,y,width,y);
  }

}

function drawClouds(){

  noStroke();
  fill(255);

  ellipse(120,80,60,35);
  ellipse(150,70,60,35);
  ellipse(180,80,60,35);

  ellipse(380,70,65,35);
  ellipse(410,60,65,35);
  ellipse(440,70,65,35);

}

function drawBuildings(){

  // building 1
  fill(30);
  rect(60,120,100,160);

  fill(255,220,120);
  for(let y=140;y<260;y+=30){
    rect(85,y,15,18);
    rect(120,y,15,18);
  }

  // building 2
  fill(110);
  rect(200,90,120,190);

  fill(255,220,120);
  for(let y=110;y<260;y+=30){
    rect(235,y,15,18);
    rect(275,y,15,18);
  }

  // building 3
  fill(60);
  rect(360,110,110,170);

  fill(255,220,120);
  for(let y=130;y<260;y+=30){
    rect(395,y,15,18);
    rect(430,y,15,18);
  }

  // building 4
  fill(140);
  rect(500,130,80,150);

  fill(255,220,120);
  for(let y=150;y<260;y+=30){
    rect(520,y,15,18);
    rect(550,y,15,18);
  }

}

function drawRoad(){

  fill(50);
  rect(0,280,width,120);

  stroke(255);
  strokeWeight(4);

  for(let i=0;i<width;i+=50){
    line(i,340,i+25,340);
  }

  noStroke();

}
function drawCar(){

  push();
  translate(width/2,320);

  fill(0,80);
  ellipse(0,40,220,22);

  fill(220,40,40);
  rect(-110,-35,220,55,15);

  rect(-55,-75,110,45,12);

  fill(180,220,255);
  rect(-45,-68,35,30,5);
  rect(10,-68,35,30,5);


  fill(20);
  ellipse(-75,35,50);
  ellipse(75,35,50);

  fill(170);
  ellipse(-75,35,20);
  ellipse(75,35,20);

  pop();

}