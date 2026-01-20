// Tile constants
export const tileSize = 32;

// Convert map data to wall objects
export function buildWalls(map) {
  const walls = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "#") {
        walls.push({
          x: x * tileSize,
          y: y * tileSize,
          width: tileSize,
          height: tileSize,
          id: "wallImage"
        });
      } else if (map[y][x] === "'") {
        walls.push({
          x: x * tileSize,
          y: y * tileSize,
          width: 0,
          height: 0,
          id: "whiteFloor"
        });
      } else if (map[y][x] === "`") {
        walls.push({
          x: x * tileSize,
          y: y * tileSize,
          width: 0,
          height: 0,
          id: "blueFloor"
        });
      } else if (map[y][x] === "*") {
        walls.push({
          x: x * tileSize,
          y: y * tileSize,
          width: 0,
          height: 0,
          id: "corner1"
        });
      } else if (map[y][x] === "&") {
        walls.push({
          x: x * tileSize,
          y: y * tileSize,
          width: 0,
          height: 0,
          id: "corner2"
        });
      } else if (map[y][x] === "<") {
        walls.push({
          x: x * tileSize,
          y: y * tileSize,
          width: 0,
          height: 0,
          id: "wallCorner1"
        });
      } else if (map[y][x] === ">") {
        walls.push({
          x: x * tileSize,
          y: y * tileSize,
          width: 0,
          height: 0,
          id: "wallCorner2"
        });
      }
    }
  }

  return walls;
}
