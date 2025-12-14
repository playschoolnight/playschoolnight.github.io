import Game from "./game/game.js";

import { walls } from "./game/walls.js";
import { loadWalls } from "./game/walls.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 20;

loadWalls(walls.length, walls[0].length);

const game = new Game(ctx, canvas);

const start = document.getElementById("start");

start.addEventListener("click", () =>{
start.style.visibility = "hidden";
game.start();
})

