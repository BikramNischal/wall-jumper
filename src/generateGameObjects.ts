
import Blade from "../modules/blade.ts";
import Wall, {randomWallHeight} from "../modules/wall.ts";
import { CANVAS_HEIGHT, WALL_Y_GAP, GAME_MOVEMENT, BLADE_RANGE } from "../utils/constants.ts";
import {calcx} from "../utils/generatePosition.ts";
import random, { prob50 } from "../utils/random.ts";


// generate num number of walls
export function generateWalls(num: number) {
	const walls: Wall[] = [];
	// const availableXPositions = generateXPositions(num);
	// const availableYpositions = generateYPositions(num);
	for (let i = 0; i < num; ++i) {
		const x = calcx();
		const wall = new Wall(x, 0, "normal", "./images/normal-wall.png");
		const wallHeight = randomWallHeight();
		const y = CANVAS_HEIGHT - wallHeight - WALL_Y_GAP * (i + 1);
		wall.h = wallHeight; 
		wall.y = y;
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
			calcx(),
			newWallY,
			"normal",
			"./images/normal-wall.png"
		);
		newWall.h = newWallHeight;
		walls.push(newWall);
	}

	walls.forEach((wall) => {
		wall.y += GAME_MOVEMENT;
		if (wall.y > CANVAS_HEIGHT) {
			//remove the wall(i.e first wall in the list) that goes out of canvas
			walls.shift();

			//first wall in the array is removed and second wall becomes the first wall
			//which causes the new first wall disappear as first wall
			//(i.e wall that is already removed from the list) is already displayed
			//but new first is not displayed yet so to make the new wall appear again
			// re-draw the new first wall i.e wall at near bottom of canvas
			if (walls[0]) {
				walls[0].y += 10;
				walls[0].draw();
			}
		}
	});
}

export function updateBlades(blades: Blade[]){
    blades.forEach((blade) => {
        blade.y += GAME_MOVEMENT;
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
