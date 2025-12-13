import { player, move } from "./player.js";
import { walls } from "./walls.js";
import { keys } from "./input.js";

export default class Game{
    constructor(ctx, canvas){
        this.ctx = ctx;
        this.canvas = canvas;
        this.wallindex = 0;
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
    move(x,y, walls[this.wallindex]);

    //changes screen
    if(player.x>this.canvas.width-player.width && this.wallindex<walls.length-1){
    this.wallindex++;
    player.x=0;
}
    if(player.x<0 && this.wallindex>0){
    this.wallindex--;
    player.x=this.canvas.width-player.width;
}

}
   
draw(){
    this.ctx.fillStyle = "purple";
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
     this.ctx.fillRect(player.x, player.y, player.width, player.height);

    //walls
    this.ctx.fillStyle = "pink";
    for(const wall of walls[this.wallindex]){
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
