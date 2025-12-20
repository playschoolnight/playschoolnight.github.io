import Game from "./game/game.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;

const tileSize = 32;
const worldWidth = tileSize * 32;
const worldHeight = tileSize * 18;

function resizeCanvas() {
  const scale = Math.min(
    window.innerWidth / worldWidth,
    window.innerHeight / worldHeight
  );

  canvas.width = worldWidth;
  canvas.height = worldHeight;

  canvas.style.width = `${worldWidth * scale}px`;
  canvas.style.height = `${worldHeight * scale}px`;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const game = new Game(ctx, canvas);

const menu = document.getElementById("startMenu");
const title = document.getElementById("title");
const startBtn = document.getElementById("start");

startBtn.onclick = async () => {
  await document.documentElement.requestFullscreen();
};

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    menu.style.display = "none";
    title.style.display = "none";
    game.resume();
  } else {
    menu.style.display = "flex";
    title.style.display = "block";
    game.pause();
  }
});
