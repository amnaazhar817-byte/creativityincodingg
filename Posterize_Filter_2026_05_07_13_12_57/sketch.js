let img;

function preload() {
  img = loadImage("a2.jpg"); 
}

function setup() {
  createCanvas(img.width, img.height);
  image(img, 0, 0);     
  filter(POSTERIZE, 2); 
  noLoop();
}

function draw() {
}