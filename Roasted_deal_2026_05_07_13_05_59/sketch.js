let songsData = [
  { title: "For Her", artist: "Unknown", genre: "Pop", plays: 220, duration: "2:13", file: "forher.mp3", color: "#05FFA1" },
  { title: "Kugelsicher", artist: "TremoxBeatz", genre: "Hip-Hop", plays: 190, duration: "2:36", file: "kugelsicher.mp3", color: "#6C14FF" },
  { title: "Gardens", artist: "Penguinmusic", genre: "R&B", plays: 210, duration: "1:56", file: "gardens.mp3", color: "#FF9100" },
  { title: "Dance Playful Night", artist: "AleXZavesa", genre: "Pop", plays: 175, duration: "1:45", file: "danceplayfulnight.mp3", color: "#B0FF00" }
];

let bars = [];
let activeIdx = -1;
let maxPlays = 250;

function preload() {
  for (let s of songsData) {
    s.audio = loadSound(s.file);
  }
}

function setup() {
  createCanvas(1100, 650);

  songsData.sort((a, b) => b.plays - a.plays);

  let chartX = 160;
  let chartWidth = width - 280;
  let spacing = chartWidth / songsData.length;

  for (let i = 0; i < songsData.length; i++) {
    bars.push(
      new DataBar(
        chartX + i * spacing + spacing / 2,
        songsData[i]
      )
    );
  }
}

function draw() {
  background(10, 10, 15);

  drawGrid();

  for (let i = 0; i < bars.length; i++) {
    bars[i].update();
    bars[i].display(i === activeIdx);
  }

  drawUIFrame();
  drawLegend();
  drawInsights();
}

function drawGrid() {

  stroke(255, 15);
  fill(140);

  textSize(11);
  textAlign(RIGHT, CENTER);

  for (let i = 0; i <= 5; i++) {

    let val = i * 50;

    let y = map(
      val,
      0,
      maxPlays,
      height - 120,
      120
    );

    line(140, y, width - 80, y);

    noStroke();
    text(val, 130, y);

    stroke(255, 15);
  }

  push();

  translate(60, height / 2);
  rotate(-HALF_PI);

  noStroke();
  fill(160);

  textAlign(CENTER);

  text("TOTAL PLAY COUNT", 0, 0);

  pop();
}

function drawUIFrame() {

  fill(255);

  textAlign(LEFT);

  textSize(24);

  text(
    "AMNA'S TOP HITS // THE SOUNDTRACK OF ME ✦",
    140,
    40
  );

  textSize(11);

  fill(120);

  text(
    "SOURCE: PERSONAL STREAMING DATA",
    140,
    70
  );

  stroke(255, 40);

  line(
    140,
    85,
    width - 80,
    85
  );
}

function drawLegend() {

  let genres = {};

  for (let song of songsData) {
    genres[song.genre] = song.color;
  }

  let x = width - 110; // FIXED
  let y = 120;

  fill(255);

  noStroke();

  textSize(12);

  text("GENRES", x, y);

  let offset = 30;

  for (let genre in genres) {

    fill(genres[genre]);

    rect(
      x,
      y + offset,
      12,
      12
    );

    fill(220);

    text(
      genre,
      x + 22,
      y + offset + 10
    );

    offset += 25;
  }
}

function drawInsights() {

  let topSong = songsData[0];

  let hiphopTotal = songsData
    .filter(song => song.genre === "Hip-Hop")
    .reduce((sum, song) => sum + song.plays, 0);

  fill(255);

  textSize(13);

  text(
    "TOP TRACK: " +
    topSong.title +
    " (" +
    topSong.plays +
    " plays)",
    140,
    height - 40
  );

  fill(255, 100, 200);

  text(
    "HIP-HOP DOMINATES: " +
    hiphopTotal +
    " total streams",
    420,
    height - 40
  );
}

function mousePressed() {

  for (let i = 0; i < bars.length; i++) {

    if (bars[i].clicked(mouseX, mouseY)) {

      if (activeIdx === i) {

        songsData[i].audio.stop();

        activeIdx = -1;

      } else {

        if (activeIdx !== -1) {
          songsData[activeIdx].audio.stop();
        }

        songsData[i].audio.play();

        activeIdx = i;
      }
    }
  }
}

class DataBar {

  constructor(x, data) {

    this.x = x;

    this.data = data;

    this.w = 85;

    this.h = map(
      data.plays,
      0,
      maxPlays,
      0,
      height - 240
    );

    this.currentH = 0;

    this.col = color(data.color);

    this.baseY = height - 120;
  }

  update() {

    this.currentH = lerp(
      this.currentH,
      this.h,
      0.08
    );
  }

  display(isActive) {

    push();

    translate(
      this.x,
      this.baseY
    );

    let segments = 18;

    let segH = this.currentH / segments;

    let gap = 3;

    noStroke();

    for (let i = 0; i < segments; i++) {

      let alpha = map(
        i,
        0,
        segments,
        80,
        255
      );

      fill(
        red(this.col),
        green(this.col),
        blue(this.col),
        alpha
      );

      if (isActive) {
        drawingContext.shadowBlur = 15;
        drawingContext.shadowColor = this.data.color;
      }

      rect(
        -this.w / 2,
        -i * (segH + gap),
        this.w,
        -segH,
        2
      );
    }

    if (isActive) {
      this.drawMetadataCard();
    }

    drawingContext.shadowBlur = 0;

    fill(255);

    textAlign(CENTER);

    textSize(11);

    text(
      this.data.title.toUpperCase(),
      0,
      30
    );

    fill(this.col);

    text(
      this.data.plays,
      0,
      -this.currentH - 20
    );

    pop();
  }

  drawMetadataCard() {

    push();

    let popupX = 0;
    let popupY = -this.currentH - 120;

    // FIXED
    if (this.currentH > 320) {
      popupX = 130;
      popupY = -250;
    }

    translate(
      popupX,
      popupY
    );

    fill(15, 15, 25, 245);

    stroke(this.col);

    rect(
      -100,
      -70,
      200,
      100,
      8
    );

    noStroke();

    fill(255);

    textAlign(LEFT);

    textSize(11);

    text("TRACK: " + this.data.title, -85, -45);
    text("ARTIST: " + this.data.artist, -85, -25);
    text("GENRE: " + this.data.genre, -85, -5);
    text("LENGTH: " + this.data.duration, -85, 15);

    pop();
  }

  clicked(mx, my) {

    return (
      mx > this.x - this.w / 2 &&
      mx < this.x + this.w / 2 &&
      my > this.baseY - this.h &&
      my < this.baseY
    );
  }
}