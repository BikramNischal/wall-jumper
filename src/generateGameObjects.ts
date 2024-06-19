
import Blade from "../modules/blade.ts";
import Wall, {randomWallHeight, randomWallType} from "../modules/wall.ts";
import { CANVAS_HEIGHT, WALL_Y_GAP, BLADE_RANGE} from "../utils/constants.ts";
import {calcx, getWallXPos} from "../utils/generatePosition.ts";
import random, { prob50 } from "../utils/random.ts";
// import Spike from "../modules/spike.ts";


//generate a wall
export function generateWall(prevWall : Wall | null){
	const x = getWallXPos();
	const wallHeight = randomWallHeight();
	const y = (prevWall) ? prevWall.y - wallHeight - WALL_Y_GAP: CANVAS_HEIGHT - wallHeight -WALL_Y_GAP; 
	const wallType = randomWallType();
	let wall: Wall;
	if(wallType === 1)
		wall = new Wall(x,y,1, "./images/normal-wall.png");
	else 
		wall = new Wall(x,y,2,"./images/rubber-wall.png" );
	wall.h = wallHeight;
	return wall;
}


// generate num number of walls
export function generateWalls(num: number) {
	const walls: Wall[] = [];
	for (let i = 0; i < num; ++i) {
		let wall = walls.length ? generateWall(walls[walls.length-1]) : generateWall(null);
        walls.push(wall);
	} 
	return walls;
}

// takes number of obstacle to generate i.e num
export function generateBlades(num: number){
    //Gap between blades  
    const bladeGap = CANVAS_HEIGHT / (num+1);

    const blades : Blade[] = [];
    for(let i=0; i < num; ++i){
        // get start and end range for blade movement
        const startpos = calcx();
        const endpos = startpos + BLADE_RANGE; 

        //generate a random x-position within the start and end range
        const xpos = startpos + random(50);

        const blade = new Blade(xpos, 0, "horizontal", "./images/saw-blade.png",startpos,endpos);
        const y = CANVAS_HEIGHT - blade.h - bladeGap * (i+1);

        blade.y = y;
        // randomly assign direction 
        blade.dx = prob50() ? 1 : -1;
        blade.dy = prob50() ? 1 : -1;

        if(blade.y > 0) blades.push(blade);
    }
    return blades; 
}


// update wall list
export function updateWalls(walls: Wall[]){
	// condition checks if the gap between top most wall and the starting-y of canvas
	// is greater than wall gap in y-axis
	// if true then new wall is created and add to the list
	if (walls[walls.length - 1].y > WALL_Y_GAP) {
		//this calcuates the y-position of new wall
		const newWallHeight = randomWallHeight();
		const newWallY = walls[walls.length - 1].y - WALL_Y_GAP - newWallHeight;
		const newWall = new Wall(
			getWallXPos(),
			newWallY,
			1,
			"./images/normal-wall.png"
		);
		newWall.h = newWallHeight;
		walls.push(newWall);
	}
}

export function updateBlades(blades: Blade[]){
    blades.forEach((blade) => {
        if(blade.y > CANVAS_HEIGHT) blades.shift();
    }); 

    
    if(blades.length === 0){
        const newBlades =  generateBlades(random(5));
        newBlades.reverse();
        newBlades.forEach((blade) => {
            blade.y *= -1;
        });
        blades.push(...newBlades);
    }
}
