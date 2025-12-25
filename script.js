function playMusic() {
  document.getElementById("music").play().catch(() => {});
}

const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const flakes = [];
const COUNT = 70;

for (let i = 0; i < COUNT; i++) {
  flakes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 6 + 4,
    speed: Math.random() * 0.3 + 0.1,
    drift: Math.random() * 0.6 - 0.3
  });
}

function drawGlowCrystal(x, y, size) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.PI / 4);

  ctx.shadowBlur = 10;
  ctx.shadowColor = "rgba(100,180,255,0.9)";
  ctx.strokeStyle = "rgba(100,180,255,1)";
  ctx.lineWidth = 1.3;

  ctx.beginPath();
  ctx.moveTo(-size / 2, 0);
  ctx.lineTo(size / 2, 0);
  ctx.moveTo(0, -size / 2);
  ctx.lineTo(0, size / 2);
  ctx.stroke();

  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  flakes.forEach(flake => {
    drawGlowCrystal(flake.x, flake.y, flake.size);

    flake.y += flake.speed;
    flake.x += flake.drift;

    if (flake.y > canvas.height) {
      flake.y = -10;
      flake.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(animate);
}

animate();


// === MOBILE FIXES ===
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

document.addEventListener("touchstart", () => {
  if (audio.paused) audio.play();
}, { once: true });
