import { collision } from "./collision.js";

// Create enemy
export function createEnemy(x, y) {
  return {
    x,
    y,
    width: 66,
    height: 32,
    hp: 20,
    speed: 2.2,
    alive: true,
    kbX: 0,
    kbY: 0
  };
}

// Update enemy position and behavior
export function updateEnemy(enemy, player, walls) {
  if (!enemy.alive) return;

  // Apply knockback incrementally using wall collision
  if (enemy.kbX !== 0 || enemy.kbY !== 0) {
    // Move enemy along X and check collision
    enemy.x += enemy.kbX;
    for (const wall of walls) {
      if (collision(enemy, wall) && wall.width > 0) {
        if (enemy.kbX > 0) enemy.x = wall.x - enemy.width;
        if (enemy.kbX < 0) enemy.x = wall.x + wall.width;
        enemy.kbX = 0;
      }
    }

    // Move enemy along Y and check collision
    enemy.y += enemy.kbY;
    for (const wall of walls) {
      if (collision(enemy, wall) && wall.width > 0) {
        if (enemy.kbY > 0) enemy.y = wall.y - enemy.height;
        if (enemy.kbY < 0) enemy.y = wall.y + wall.height;
        enemy.kbY = 0;
      }
    }

    // Decay knockback
    enemy.kbX *= 0.85;
    enemy.kbY *= 0.85;
    if (Math.abs(enemy.kbX) < 0.05) enemy.kbX = 0;
    if (Math.abs(enemy.kbY) < 0.05) enemy.kbY = 0;

    return; // Skip normal movement while under knockback
  }

  // Move towards player
  const dx = player.x + player.width / 2 - (enemy.x + enemy.width / 2);
  const dy = player.y + player.height / 2 - (enemy.y + enemy.height / 2);
  const length = Math.hypot(dx, dy); 
  if (length > 0) {
    const normX = dx / length;
    const normY = dy / length;

    enemy.x += normX * enemy.speed;
    for (const wall of walls) {
      if (collision(enemy, wall) && wall.width > 0) {
        enemy.x -= normX * enemy.speed;
        break;
      }
    }

    enemy.y += normY * enemy.speed;
    for (const wall of walls) {
      if (collision(enemy, wall) && wall.width > 0) {
        enemy.y -= normY * enemy.speed;
        break;
      }
    }
  }
}
