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

document.getElementById("start").onclick = async () => {
  document.getElementById("start").style.display = "none";

  if (document.documentElement.requestFullscreen) {
    await document.documentElement.requestFullscreen();
  }

  game.start();
};

const fullscreenBtn = document.getElementById("fullscreen");

fullscreenBtn.onclick = async () => {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen();
  }
};



document.addEventListener("fullscreenchange", () => {
    if(document.fullscreenElement){
        fullscreenBtn.style.display = "none";
    }else{
        fullscreenBtn.style.display = "block";
    }
     
});
