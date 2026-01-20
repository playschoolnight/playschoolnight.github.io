// Track pressed keys
export const keys = new Set();

// Input listeners
document.addEventListener("keydown", (e) => {
  keys.add(e.key);
});

document.addEventListener("keyup", (e) => {
  keys.delete(e.key);
});
