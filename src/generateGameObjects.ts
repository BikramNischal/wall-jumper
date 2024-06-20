import Blade from "../modules/blade.ts";
import Wall, { randomWallHeight, randomWallType } from "../modules/wall.ts";
import {
	CANVAS_SIZE,
	BALDE_SIZE,
	WALL,
	BLADE_RANGE
} from "../utils/constants.ts";
import { calcx, getWallXPos } from "../utils/generatePosition.ts";
import random, { prob50, randomRange } from "../utils/random.ts";
// import Spike from "../modules/spike.ts";

//generate a wall
export function generateWall(prevWall: Wall | null) {
	const x = getWallXPos();
	const wallHeight = randomWallHeight();
	const y = prevWall
		? prevWall.y - wallHeight - WALL.gapY
		: CANVAS_SIZE.height - wallHeight - WALL.gapY;
	const wallType = randomWallType();
	let wall: Wall;
	if (wallType === 1) wall = new Wall(x, y, 1, "./images/normal-wall.png");
	else wall = new Wall(x, y, 2, "./images/rubber-wall.png");
	wall.h = wallHeight;
	return wall;
}

// generate num number of walls
export function generateWalls(num: number) {
	const walls: Wall[] = [];
	for (let i = 0; i < num; ++i) {
		let wall = walls.length
			? generateWall(walls[walls.length - 1])
			: generateWall(null);
		walls.push(wall);
	}
	return walls;
}

export function generateBlade() {
	//get start and end point of the balde movement range
	const startpos = calcx();
	const endpos =
		startpos + BLADE_RANGE - 2*BALDE_SIZE.width> CANVAS_SIZE.width - BALDE_SIZE.width
			? CANVAS_SIZE.width - BALDE_SIZE.width
			: startpos + BLADE_RANGE;

	//generate a random x-position within the start and end range
	const x = randomRange(startpos, endpos);
	const blade = new Blade(
		x,
		0,
		"horizontal",
		"./images/saw-blade.png",
		startpos,
		endpos
	);
	return blade;
}

// takes number of obstacle to generate i.e num
export function generateBlades(num: number) {
	//Gap between blades
	const bladeGap = CANVAS_SIZE.height / (num + 1);

	const blades: Blade[] = [];
	for (let i = 0; i < num; ++i) {
		const blade: Blade = generateBlade();
		console.log(blade);
		const y = CANVAS_SIZE.height - blade.h - bladeGap * (i + 1);
		blade.y = y;
		// randomly assign direction
		blade.dx = prob50() ? 1 : -1;
		blade.dy = prob50() ? 1 : -1;

		blades.push(blade);
	}
	return blades;
}

// update wall list
export function updateWalls(walls: Wall[]) {
	// condition checks if the gap between top most wall and the starting-y of canvas
	// is greater than wall gap in y-axis
	// if true then new wall is created and add to the list
	if (walls.length) {
		const prevWall = walls[walls.length - 1];
		if (walls[walls.length - 1].y > WALL.gapY) {
			//this calcuates the y-position of new wall
			const newWallHeight = randomWallHeight();
			const newWallY =
				walls[walls.length - 1].y - WALL.gapY - newWallHeight;
			const newWall = generateWall(prevWall);
			newWall.h = newWallHeight;
			newWall.y = newWallY;
			walls.push(newWall);
		}
	} else {
		walls.push(generateWall(null));
	}
}

export function updateBlades(blades: Blade[]) {
	blades.forEach((blade) => {
		if (blade.y > CANVAS_SIZE.height) blades.shift();
	});

	if (blades.length === 0) {
		const newBlades = generateBlades(random(3));
		newBlades.reverse();
		newBlades.forEach((blade) => {
			blade.y *= -1;
		});
		blades.push(...newBlades);
	}
}
