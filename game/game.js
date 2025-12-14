import { player, move } from "./player.js";
import { keys } from "./input.js";
import { maps } from "./walls.js";
import { buildWalls, tileSize } from "./tiles.js";

export default class Game {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;

    this.tileSize = tileSize;
    this.roomX = 0;
    this.roomY = 0;

    this.loadRoom();
  }

  music = document.getElementById("backgroundMusic");

  loadRoom() {
    this.currentMap = maps[this.roomY][this.roomX];
    this.walls = buildWalls(this.currentMap);
    this.worldWidth = this.currentMap[0].length * this.tileSize;
    this.worldHeight = this.currentMap.length * this.tileSize;
  }

  update() {
    let dx = 0;
    let dy = 0;

    if (keys.has("ArrowUp") || keys.has("w")) dy -= player.speed;
    if (keys.has("ArrowDown") || keys.has("s")) dy += player.speed;
    if (keys.has("ArrowLeft") || keys.has("a")) dx -= player.speed;
    if (keys.has("ArrowRight") || keys.has("d")) dx += player.speed;

    move(dx, dy, this.walls);

    if (player.x >= this.worldWidth - player.width && this.roomX < maps[this.roomY].length - 1) {
      this.roomX++;
      this.loadRoom();
      player.x = 0;
      return;
    }

    if (player.x <= 0 && this.roomX > 0) {
      this.roomX--;
      this.loadRoom();
      player.x = this.worldWidth - player.width;
      return;
    }

    if (player.y <= 0 && this.roomY > 0) {
      this.roomY--;
      this.loadRoom();
      player.y = this.worldHeight - player.height;
      return;
    }

    if (
      player.y >= this.worldHeight - player.height &&
      this.roomY < maps.length - 1
    ) {
      this.roomY++;
      this.loadRoom();
      player.y = 0;
      return;
    }

    player.x = Math.max(0, Math.min(player.x, this.worldWidth - player.width));
    player.y = Math.max(0, Math.min(player.y, this.worldHeight - player.height));
  }

  draw() {
    this.ctx.clearRect(0, 0, this.worldWidth, this.worldHeight);

    this.ctx.fillStyle = "pink";
    for (const wall of this.walls) {
      this.ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    }

    this.ctx.fillStyle = "purple";
    this.ctx.fillRect(player.x, player.y, player.width, player.height);
  }

  run = () => {
    this.update();
    this.draw();
    requestAnimationFrame(this.run);
  };

  start() {
    requestAnimationFrame(this.run);
    this.music.play();
    this.music.loop = true;
  }
}



