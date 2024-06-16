import { ctx } from "./canvas.ts";
import {
	WALL_WIDTH,
	WALL_HEIGHT_BIG,
	WALL_HEIGHT_MEDIUM,
	WALL_HEIGHT_SMALL,
	CANVAS_WIDTH,
	WALL_X_GAP,
	WALL_Y_GAP,
	CANVAS_HEIGHT,
} from "../utils/constants.ts";

import random from "../utils/random.ts";

export default class Wall {
	x: number;
	y: number;
	dx: number;
	dy: number;
	w: number;
	h: number;
	img: HTMLImageElement;
	type: string;
	loaded: boolean;

	constructor(posx: number, posy: number, type: string, imgsrc: string) {
		this.x = posx;
		this.y = posy;
		this.dx = 0;
		this.dy = 50;
		this.w = WALL_WIDTH;
		this.h = WALL_HEIGHT_SMALL;
		this.type = type;
		this.loaded = false;

		this.img = new Image();
		this.img.src = imgsrc;
		this.img.onload = () => {
			this.loaded = true;
			this.draw();
		};
	}

	updateImage(imgsrc: string) {
		this.img.src = imgsrc;
	}

	draw() {
		if (this.loaded)
			ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
	}

	moveInY() {
		this.y += this.dy;
	}

	moveInX() {
		this.x += this.dx;
	}
}


// choose wall height randomly
function randomWallHeight() {
	const wallChoice = random(2);
	let wallHeight = 0;
		switch(wallChoice){
		    case(0):
                wallHeight = WALL_HEIGHT_SMALL;
                break;
            case(1):
                wallHeight = WALL_HEIGHT_MEDIUM;
                break;
            case(2):
                wallHeight= WALL_HEIGHT_BIG;
                break;
        }

    return wallHeight;
}

// calculate the x position of the wall to be generated
// the x postion of the wall is in between 25% of the canvas to 75% of the canvas
// i.e CANVAS_WIDTH/4 TO CANVAS_WIDTH * 3/4
function calcx() {
	//get random x from 0 to middle of canvas
	const xRandom = random(CANVAS_WIDTH / 2);

	// translate x such that it fall beyound 1/4 of canvas width
	const xTranslate = CANVAS_WIDTH / 4 + xRandom;

	// add wall gap in x-axis
	const xWithGap = xTranslate + WALL_X_GAP;

	// adjust X such that its fall in range CANVAS_WIDTH/4 TO CANVAS_WIDTH*3/4
	const adjustX =
		xWithGap > (CANVAS_WIDTH * 3) / 4
			? xWithGap - CANVAS_WIDTH / 2
			: xWithGap;

	return adjustX;
}

// generate num number of walls
function generateWalls(num: number) {
	const walls = [];
	for (let i = 0; i < num; ++i) {
		const x = calcx();
		const wall = new Wall(x, 0, "normal", "./images/normal-wall.png");
        const wallHeight = randomWallHeight(); 
		const y = CANVAS_HEIGHT - wallHeight - WALL_Y_GAP * (i + 1);
        wall.y = y;
        wall.h = wallHeight;
		walls.push(wall);
	}
	return walls;
}

export { calcx, generateWalls, randomWallHeight };
