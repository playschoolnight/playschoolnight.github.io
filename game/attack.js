// Create melee attack hitbox
export function createMeleeHitbox(player) {
  const size = 32;

  return {
    x: player.x + player.width / 2 + player.facing.x * size - size / 2,
    y: player.y + player.height / 2 + player.facing.y * size - size / 2,
    width: size,
    height: size,
    damage: 2,
    life: 5
  };
}