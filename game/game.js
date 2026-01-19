import { player, move } from "./player.js";
import { keys } from "./input.js";
import { maps } from "./walls.js";
import { buildWalls, tileSize } from "./tiles.js";

import { createMeleeHitbox } from "./attack.js";
import { createEnemy, updateEnemy } from "./enemies.js";
import { collision } from "./collision.js";


export default class Game {
  constructor(ctx) {
    this.ctx = ctx;


      //rooms and transitions
    this.roomX = 0;
    this.roomY = 0;

    this.cameraX = 0;
    this.cameraY = 0;
    this.targetCamX = 0;
    this.targetCamY = 0;

    this.transitioning = false;
    this.transitionDir = null;

    this.prevWalls = null;
    this.nextWalls = null;


      //audio
    this.paused = true;
    this.started = false;

    this.volumeSlider = document.getElementById("volumeSlider");
    this.volume = 0.5;

    this.music = [
      ["hallPass", "zoningOut"],
      ["horrorsOfHamilton", "captureTheFlag"]
    ];
    this.currentMusic = null;
    


      //enemies and combat
    this.attacks = [];
    this.enemies = [ createEnemy(200, 200) ];

      //fps tracker
    this.fpsElement = document.getElementById("fps");
    this.fpsFrames = 0;
    this.fpsLastTime = performance.now();

    this.loadGame();

  

  

    

this.fpsToggle = document.getElementById("fpsToggle");

if (this.fpsToggle && this.fpsElement) {

  this.fpsToggle.classList.toggle("checked", this.showFPS);
  this.fpsElement.style.display = this.showFPS ? "block" : "none";

  this.fpsToggle.onclick = () => {
    this.showFPS = !this.showFPS;

    this.fpsToggle.classList.toggle("checked", this.showFPS);
    this.fpsElement.style.display = this.showFPS ? "block" : "none";

    this.saveGame();
  };
}


    this.loadRoom();
  }

  //pause and resume
  pause() { this.paused = true; }

  resume() {
    this.paused = false;
    if (!this.started) {
      this.started = true;
      requestAnimationFrame(this.run);
    }
  }

  //save and load game data
  saveGame() {
    localStorage.setItem("schoolNightSave", JSON.stringify({
      volume: this.volume,
      roomX: this.roomX,
      roomY: this.roomY,
      playerX: player.x,
      playerY: player.y,
      showFPS: this.showFPS
    }));
  }

  loadGame() {
    const d = JSON.parse(localStorage.getItem("schoolNightSave"));
    if (!d) return;
    this.volume = d.volume ?? 0.5;
    this.roomX = d.roomX ?? 0;
    this.roomY = d.roomY ?? 0;
    player.x = d.playerX ?? 64;
    player.y = d.playerY ?? 64;
    this.showFPS = d.showFPS ?? true;
  }

  //load current room map and walls
  loadRoom() {
    this.map = maps[this.roomY][this.roomX];
    this.walls = buildWalls(this.map);
    this.w = this.map[0].length * tileSize;
    this.h = this.map.length * tileSize;
  }

  //update music based on room
  updateMusic() {
    const id = this.music[this.roomY]?.[this.roomX];
    if (!id) return;

    const next = document.getElementById(id);
    if (this.currentMusic == next) return;

    if (this.currentMusic) {
      this.currentMusic.pause();
      this.currentMusic.currentTime = 0;
    }

    this.currentMusic = next;
    this.currentMusic.loop = true;
    this.currentMusic.volume = this.volume;
    this.currentMusic.play();
  }
  
  //start room transition animation
  startTransition(dx, dy) {
    if (this.transitioning) return;

    this.transitioning = true;
    this.transitionDir = { dx, dy };

    this.prevWalls = this.walls;

    const nextRoomX = this.roomX + dx;
    const nextRoomY = this.roomY + dy;

    const nextMap = maps[nextRoomY][nextRoomX];
    this.nextWalls = buildWalls(nextMap);

    this.targetCamX = dx * this.w;
    this.targetCamY = dy * this.h;
  }

  //complete room transition
  finishTransition() {
    this.roomX += this.transitionDir.dx;
    this.roomY += this.transitionDir.dy;

    this.loadRoom();

    if (this.transitionDir.dx == 1) player.x = 0;
    if (this.transitionDir.dx == -1) player.x = this.w - player.width;
    if (this.transitionDir.dy == 1) player.y = 0;
    if (this.transitionDir.dy == -1) player.y = this.h - player.height;

    this.cameraX = 0;
    this.cameraY = 0;
    this.targetCamX = 0;
    this.targetCamY = 0;

    this.prevWalls = null;
    this.nextWalls = null;

    this.transitioning = false;
    this.transitionDir = null;

    this.saveGame();
  }

  //update game state each frame
  update() {
    if (this.paused) return;

    if (this.transitioning) {
      this.cameraX += (this.targetCamX - this.cameraX) * 0.2;
      this.cameraY += (this.targetCamY - this.cameraY) * 0.2;

      if (Math.abs(this.cameraX - this.targetCamX) < 1 &&
          Math.abs(this.cameraY - this.targetCamY) < 1) {
        this.finishTransition();
      }
      return;
    }

    let dx = 0, dy = 0;
    if (keys.has("w")) dy--;
    if (keys.has("s")) dy++;
    if (keys.has("a")) dx--;
    if (keys.has("d")) dx++;

    if (keys.has(" ") && player.attackCooldown <= 0) {
        this.attacks.push(createMeleeHitbox(player));
        player.attackCooldown = player.attackRate;
      }

      if (player.attackCooldown > 0)
      player.attackCooldown--;

      for (const atk of this.attacks) atk.life--;
      this.attacks = this.attacks.filter(a => a.life > 0);

      for (const enemy of this.enemies) {
          updateEnemy(enemy, player);


      for (const atk of this.attacks) {
            if (collision(enemy, atk)) {
            enemy.hp -= atk.damage;
            atk.life = 0;

            const dx = enemy.x - player.x;
            const dy = enemy.y - player.y;
            const l = Math.hypot(dx, dy) || 1;
            
            const force = 4;

            enemy.kbX = (dx / l) * force;
            enemy.kbY = (dy / l) * force;

            if (enemy.hp <= 0) enemy.alive = false;
        }
    }
}


this.enemies = this.enemies.filter(e => e.alive);

    if (dx || dy) {
      player.facing.x = dx;
      player.facing.y = dy;
      const l = Math.hypot(dx, dy);
      move((dx / l) * player.speed, (dy / l) * player.speed, this.walls);
    }

    if (player.x >= this.w && this.roomX < maps[0].length - 1)
      this.startTransition(1, 0);
    else if (player.x < 0 && this.roomX > 0)
      this.startTransition(-1, 0);
    else if (player.y >= this.h && this.roomY < maps.length - 1)
      this.startTransition(0, 1);
    else if (player.y < 0 && this.roomY > 0)
      this.startTransition(0, -1);
  }

  //render game graphics
  draw() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.setTransform(1, 0, 0, 1, -this.cameraX, -this.cameraY);

    for (const w of this.walls) {
      this.ctx.drawImage(
        document.getElementById(w.id),
        w.x,
        w.y,
        32,
        32
      );
    }

    if (this.transitioning && this.nextWalls) {
      const ox = this.transitionDir.dx * this.w;
      const oy = this.transitionDir.dy * this.h;

      for (const w of this.nextWalls) {
        this.ctx.drawImage(
          document.getElementById(w.id),
          w.x + ox,
          w.y + oy,
          32,
          32
        );
      }
    }

    this.ctx.drawImage(characterGreen, player.x - 7, player.y - 60);
  
  
    this.ctx.fillStyle = "red";
    for (const atk of this.attacks)
    this.ctx.fillRect(atk.x, atk.y, atk.width, atk.height);


    this.ctx.fillStyle = "purple";
    for (const e of this.enemies)
    this.ctx.fillRect(e.x, e.y, e.width, e.height);
  }

  //main game loop
  run = () => {
    this.fpsFrames++;
    const now = performance.now();
    if (now - this.fpsLastTime >= 1000) {
      if (this.fpsElement) {
        this.fpsElement.textContent = `FPS: ${this.fpsFrames}`;
      }
      this.fpsFrames = 0;
      this.fpsLastTime = now;
    }

    this.update();
    this.draw();
    this.updateMusic();

    requestAnimationFrame(this.run);
  };
}
