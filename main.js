import Game from "./game/game.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 20;

const game = new Game(ctx, canvas);
game.start();
