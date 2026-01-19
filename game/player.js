import { collision } from "./collision.js";

//player stats
export const player = {
  x: 64,
  y: 64,
  width: 18,
  height: 14,
  speed: 2,
  hp: 10,
  maxHp: 10,
  //attack stats
  attackCooldown: 0,
  attackRate: 20,
  facing: { x: 1, y: 0 }
};

//movement and collision
export function move(dx, dy, walls) {
  player.x += dx;
  for (const wall of walls) {
    if (collision(player, wall) && wall.width > 0) {
      player.x -= dx;
      break;
    }
  }

  player.y += dy;
  for (const wall of walls) {
    if (collision(player, wall) && wall.width > 0) {
      player.y -= dy;
      break;
    }
  }
}
