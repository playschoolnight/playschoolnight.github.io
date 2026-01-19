//create melee attack hitbox
export function createMeleeHitbox(player) {
  const size = 64;

  return {
    x: player.x + player.width / 2 + player.facing.x * size - size / 2,
    y: player.y + player.height / 2 + player.facing.y * size - size / 2,
    width: size,
    height: size,
    damage: 1,
    life: 5
  };
}