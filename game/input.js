export const keys = new Set();

document.addEventListener("keydown", e => {3
  keys.add(e.key);
});

document.addEventListener("keyup", e => {
  keys.delete(e.key);
});
