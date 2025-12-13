const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth-10;
canvas.height = window.innerHeight-20;


export default class Game{
    constructor(ctx, canvas){
        this.ctx = ctx;
        this.canvas = canvas;
    }
}

const player = {
  x: 100,
  y: 100,
  width: 32,
  height: 32,
  speed: 5
};

let wallindex = 0;
const walls = [
    [{x:300, y: 200, width: 1000, height:67},
    {x:400, y:10, width:1000, height:67}],
    [{x:400, y:10, width:1000, height:67}]
]
function collision(a, b){
    return (
        a.x < b.x + b.width &&  a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
    );
}

function move(x, y){
player.x+=x;
for(const wall of walls[wallindex]){
    if (collision(player, wall)){
        player.x-=x;
        break;
    }
}
player.y+=y;
for(const wall of walls[wallindex]){
    if (collision(player, wall)){
        player.y-=y;
        break;
    }
}
}




const keys = new Set();

document.addEventListener("keydown", e => {
    keys.add(e.key);
});

document.addEventListener("keyup", e => {
    keys.delete(e.key);
});

function game() {
    //player
    ctx.fillStyle = "purple";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    move(x,y);
    ctx.fillRect(player.x, player.y, player.width, player.height);

    //walls
    ctx.fillStyle = "pink";
    for(const wall of walls[wallindex]){
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    }

    //changes screen
    if(player.x>canvas.width-player.width && wallindex<walls.length-1){
    wallindex++;
    player.x=0;
}
    if(player.x<0 && wallindex>0){
    wallindex--;
    player.x=canvas.width-player.width;
}

    
    requestAnimationFrame(game);
}

requestAnimationFrame(game);
