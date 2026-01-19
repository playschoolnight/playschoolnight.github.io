//track pressed keys
export const keys = new Set();

//input listeners
document.addEventListener("keydown", (e) => {
  keys.add(e.key);
});

document.addEventListener("keyup", (e) => {
  keys.delete(e.key);
});
