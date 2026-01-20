// Create projectile from player position
export function createProjectile(player) {
  const size = 8;
  const speed = 5;

  return {
    x: player.x + player.width / 2 - size / 2,
    y: player.y + player.height / 2 - size / 2,
    width: size,
    height: size,
    dx: player.facing.x * speed,
    dy: player.facing.y * speed,
    damage: 1,
    life: 60 // frames before despawning
  };
}

// Update projectile position and lifetime
export function updateProjectile(proj, walls) {
  proj.x += proj.dx;
  proj.y += proj.dy;

  // Check collision with walls
  for (const wall of walls) {
    if (wall.width > 0 && proj.x < wall.x + wall.width &&
        proj.x + proj.width > wall.x &&
        proj.y < wall.y + wall.height &&
        proj.y + proj.height > wall.y) {
      proj.life = 0;
      break;
    }
  }

  proj.life--;
}
