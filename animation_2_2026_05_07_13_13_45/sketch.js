function setup() {
  createCanvas(500, 500);
}

function draw() {
  background('#800000'); 
  let colors = ['#221F1F', '#4B3F4B', '#8C708C', '#D1A3B1', '#E5B7C3', '#FF6347'];
  let spacing = 120;

  for (let x = -spacing; x < width + spacing; x += spacing) {
    for (let i = 0; i < colors.length; i++) {
      fill(colors[i]);
      noStroke();

      let wave = sin(frameCount * 0.02 + i * 0.3) * 30;
      
      beginShape();
      let offset = i * 12 + wave; 
      
      vertex(x + offset, 0);
      bezierVertex(x + offset + 100, 150, x + offset - 100, 350, x + offset, 500);
      vertex(x + offset + 50, 500);
      bezierVertex(x + offset - 50, 350, x + offset + 150, 150, x + offset + 50, 0);
      endShape(CLOSE);
    }
  }
}