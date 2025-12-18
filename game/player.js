import { collision } from "./collision.js";
export const player = {
  x: 64,
  y: 64,
  width: 18,
  height: 14,
  speed: 4
};

export function move(dx, dy, walls) {
  player.x += dx;
  for (const wall of walls) {
    
    if (collision(player, wall) && wall.width>0) {
      player.x -= dx;
      break;
    }
  }

  player.y += dy;
  for (const wall of walls) {
    if (collision(player, wall) && wall.width>0) {
      player.y -= dy;
      break;
    }
  }
}
