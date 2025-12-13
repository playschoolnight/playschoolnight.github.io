import { player, move } from "./player.js";
import { walls } from "./walls.js";
import { keys } from "./input.js";

export default class Game{
    constructor(ctx, canvas){
        this.ctx = ctx;
        this.canvas = canvas;
        this.roomX = 0;
        this.roomY = 0;
    }

update() {
    //player
    let x = 0;
    let y = 0;
    if (keys.has("ArrowUp") || keys.has("w")){
         y-=player.speed;
    }
    if (keys.has("ArrowDown") || keys.has("s")){
        y+=player.speed;
    }
    if (keys.has("ArrowLeft") || keys.has("a")){
        x-=player.speed;
    }
    if (keys.has("ArrowRight") || keys.has("d")){
        x+=player.speed;
    }
    move(x,y, walls[this.roomY][this.roomX]);

 //walls
    //right
if (player.x > this.canvas.width - player.width && this.roomX < walls[this.roomY].length - 1){
    this.roomX++;
    player.x=0;
}
    //left
if (player.x<0 && this.roomX>0){
    this.roomX--;
    player.x=this.canvas.width-player.width;
}
    //up
if (player.y <0 && this.roomY >0){
    this.roomY--;
    player.y = this.canvas.height - player.height
}
    //down
if (player.y > this.canvas.height - player.height && this.roomY < walls.length-1){
    this.roomY++;
    player.y = 0;
}
}
   
draw(){
    //player
    this.ctx.fillStyle = "purple";
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
     this.ctx.fillRect(player.x, player.y, player.width, player.height);

    //walls
    this.ctx.fillStyle = "pink";
    for(const wall of walls[this.roomY][this.roomX]){
        this.ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    }
}

run = () => {
        this.update();
        this.draw();
        requestAnimationFrame(this.run);
    }
    

start(){
    requestAnimationFrame(this.run);
    }
}
