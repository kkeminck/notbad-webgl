
let particles = [];
let img;
let dissolve = false;

function preload() {
  img = loadImage("logo.svg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  img.resize(200, 0); // Resize to fit
  img.loadPixels();

  // Sample logo image for particle positions
  for (let y = 0; y < img.height; y += 2) {
    for (let x = 0; x < img.width; x += 2) {
      let index = (x + y * img.width) * 4;
      let alpha = img.pixels[index + 3];
      if (alpha > 128) {
        let px = width / 2 - img.width / 2 + x;
        let py = height / 2 - img.height / 2 + y;
        particles.push({x: px, y: py, ox: px, oy: py, vx: 0, vy: 0});
      }
    }
  }
}

function draw() {
  background(255);
  fill(0);

  for (let p of particles) {
    if (dissolve) {
      p.vx += random(-0.5, 0.5);
      p.vy += random(-0.5, 0.5);
      p.x += p.vx;
      p.y += p.vy;
    }
    ellipse(p.x, p.y, 2, 2);
  }
}

function mouseEntered() {
  dissolve = true;
}

function mouseExited() {
  dissolve = false;
  for (let p of particles) {
    p.x = p.ox;
    p.y = p.oy;
    p.vx = 0;
    p.vy = 0;
  }
}
