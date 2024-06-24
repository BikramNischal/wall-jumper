import Blade from "../modules/blade.ts";
import Wall, { randomWallHeight, randomWallType } from "../modules/wall.ts";
import {
	CANVAS_SIZE,
	BALDE_SIZE,
	WALL,
	BLADE_RANGE,
	obstacleFace,
	SPIKE_SIZE,
	MAIN_WALL,
	GAME_MOVEMENT_OFFSET,
} from "../utils/constants.ts";
import { calcx, getWallXPos } from "../utils/generatePosition.ts";
import random, { prob50, randomRange } from "../utils/random.ts";
import Demon from "../modules/demon.ts";
import Spike from "../modules/spike.ts";
import Spider from "../modules/spider.ts";
import { ctx } from "../modules/canvas.ts";

//generate a wall
export function generateWall(prevWall: Wall | null) {

	let wall: Wall;

	const x = getWallXPos();
	const wallHeight = randomWallHeight();

	const y = prevWall
		? prevWall.y - wallHeight - WALL.gapY
		: CANVAS_SIZE.height - wallHeight - WALL.gapY;

	const wallType = randomWallType();
	if (wallType === 1) {
		wall = new Wall(x, y, 1, "./images/normal-wall.png");
	}
	else if(wallType === 2){
		wall = new Wall(x, y, 2, "./images/rubber-wall.png");
	} else{
		wall =  new Wall(x,y,3,"./images/ice-wall.png");
	} 

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

//generate blade moving blades from startpos point to endpos point
export function generateBlade() {
	//get start and end point of the balde movement range
	const startpos = calcx();
	const endpos =
		startpos + BLADE_RANGE - 2 * BALDE_SIZE.width >
		CANVAS_SIZE.width - BALDE_SIZE.width
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
	const bladeGap = CANVAS_SIZE.height/2;

	const blades: Blade[] = [];
	for (let i = 0; i < num; ++i) {
		const blade: Blade = generateBlade();
		const y = CANVAS_SIZE.height - blade.h - bladeGap * (i + 1);
		blade.y = y;
		// randomly assign direction
		blade.dx = prob50() ? 1 : -1;
		blade.dy = prob50() ? 1 : -1;

		blades.push(blade);
	}
	return blades;
}


//generate spike facing the give direction
export function generateSpike(face: obstacleFace) {
	let spike: Spike = new Spike(0, 0, face);
	return spike;
}

// generate spike according to the face and type
// for moving walls
export function generateRandomSpike() {
	const face = prob50() ? "right" : "left";
	return generateSpike(face);
}

//generate spikes for main wall on the left
export function generateMainSpikes() {
	const spikeGap = SPIKE_SIZE.height * 10;
	const spikeNum = random(3);
	const spikes: Spike[] = [];
	for (let i = 0; i < spikeNum; ++i) {
		let y = 0;
		if (spikes.length) y = spikes[spikes.length - 1].y - spikeGap;
		const spike = new Spike(MAIN_WALL.width, y, "right");
		spike.w = 32;
		spike.h = 32;
		spike.x = spike.x;
		spikes.push(spike);
	}
	return spikes;
}


// generate demon at random x position
export function generateDemon() {
	const x = calcx();
	return new Demon(x, 0, "./images/demon-left.png", 79, 69, 4);
}

//generate list of demons
export function generateDemons() {
	const demons: Demon[] = [];
	return demons;
}

//generate different color spider at surface of main wall
export function generateSpider() {
	let imgsrc = "";
	const randomNumber = random(4);
	switch (randomNumber) {
		case 0:
			imgsrc = "./images/spider-black.png";
			break;
		case 1:
			imgsrc = "./images/spider-purple.png";
			break;
		case 2:
			imgsrc = "./images/spider-green.png";
			break;
		case 3:
			imgsrc = "./images/spider-brown.png";
			break;
	}
	const x = MAIN_WALL.x + MAIN_WALL.width-MAIN_WALL.offSet;
	const spider =  new Spider(x, 0, imgsrc, 49, 80.3, 3);
	spider.dy = GAME_MOVEMENT_OFFSET;
	return spider;
}

//generate list of spiders
export function generateSpiders() {
	const spiders: Spider[] = [];
	return spiders;
}

export function displayScore(score:number){
	ctx.fillStyle = "white";
	ctx.font = "50px Offside"
	ctx.fillText (`${score}`, CANVAS_SIZE.width/2, 50);
}


