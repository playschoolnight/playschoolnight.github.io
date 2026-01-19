//create enemy
export function createEnemy(x, y) {
  return {
    x,
    y,
    width: 32,
    height: 32,
    hp: 3,
    speed: 1,
    alive: true,
    kbX: 0,
    kbY: 0
  };
}

//update enemy position and behavior
export function updateEnemy(enemy, player) {
  if (!enemy.alive) return;

  enemy.x += enemy.kbX;
  enemy.y += enemy.kbY;
  enemy.kbX *= 0.85;
  enemy.kbY *= 0.85;

  if (Math.abs(enemy.kbX) < 0.05) enemy.kbX = 0;
  if (Math.abs(enemy.kbY) < 0.05) enemy.kbY = 0;
  if (enemy.kbX !== 0 || enemy.kbY !== 0) return;

  const dx = player.x - enemy.x;
  const dy = player.y - enemy.y;
  const l = Math.hypot(dx, dy) || 1;

  enemy.x += (dx / l) * enemy.speed;
  enemy.y += (dy / l) * enemy.speed;
}