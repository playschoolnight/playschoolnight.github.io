import { collision } from "./collision.js";

export const player = {
    x: 1000,
    y: 100,
    width: 32,
    height: 32,
    speed: 5
};

export function move(x, y, walls){
player.x+=x;
for(const wall of walls){
    if (collision(player, wall)){
        player.x-=x;
        break;
    }
}
player.y+=y;
for(const wall of walls){
    if (collision(player, wall)){
        player.y-=y;
        break;
    }
}
}
