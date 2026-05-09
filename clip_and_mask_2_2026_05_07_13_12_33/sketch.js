let img;

function preload(){
  img = loadImage('a2.jpg');
}

function setup() {
  createCanvas(460, 380); 
  background(10, 25, 70); 

  img.resize(170,170);
  let clipLayer = createGraphics(170,170);
  clipLayer.triangle(0,0,85,170,170,0);
  clipLayer.canvas.getContext("2d").clip();
  clipLayer.image(img,0,0);
  image(clipLayer, 240, 30);


  let maskShape = createGraphics(170,170);
  maskShape.noStroke();
  maskShape.fill(255);
  maskShape.circle(85,85,170);  

  let maskedImg = img.get();
  maskedImg.mask(maskShape);
  image(maskedImg, 50, 180);


  fill(255);
  textSize(16);
  text("CLIP", 255, 25);
  text("MASK", 55, 170);
}