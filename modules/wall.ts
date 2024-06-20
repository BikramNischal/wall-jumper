import { ctx } from "./canvas.ts";
import {
	WALL,
	GAME_MOVEMENT,
	MAIN_WALL,
} from "../utils/constants.ts";

import random, {prob25} from "../utils/random.ts";
import Spike, { generateSpike } from "./spike.ts";

/*
Wall types 
0: Main Wall (infinite wall on the left)
1: normal wall
2: bouncing wall/ rubber wall
3: freezing wall
*/

export default class Wall {
	x: number;
	y: number;
	dx: number;
	dy: number;
	w: number;
	h: number;
	img: HTMLImageElement;
	type: number;
	loaded: boolean;
	spike: Spike | null;

	constructor(posx: number, posy: number, type: number, imgsrc: string) {
		this.x = posx;
		this.y = posy;
		this.dx = 0;
		this.dy = GAME_MOVEMENT;
		this.w = WALL.width;
		this.h = WALL.heightSmall;
		this.type = type;
		this.loaded = false;
		this.spike = this.placeSpike();
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

		// image outline  FOR TESTING ONLY
		// ctx.beginPath();
		// ctx.fillStyle = "red";
		// ctx.strokeStyle = "red";
		// ctx.rect(this.x, this.y, this.w, this.h);
		// ctx.stroke();
	}
	
	setMainWall(){

		this.w = MAIN_WALL.width;
		this.h = MAIN_WALL.height;
	}

	moveInY() {
		this.y += GAME_MOVEMENT;
		if(this.spike)
			this.spike.y += GAME_MOVEMENT;
	}

	// move walls downward with game movement
	moveInX() {
		this.x += this.dx;
	}

	placeSpike() {
		const hasSpike = prob25();
		if (hasSpike && this.type < 2 ) {
			const spike = generateSpike();
			if (spike.face === "left") {
				spike.x = this.x - spike.w ;
			} else {
				spike.x = this.x + this.w;
			}
			let y = this.y + random(this.h - spike.h);	
			spike.y = y;
			return spike;
		} else {
			return null;
		}
	}
}

// choose wall height randomly
function randomWallHeight() {
	const wallChoice = random(2);
	switch (wallChoice) {
		case 0:
			return WALL.heightSmall;
		case 1:
			return WALL.heightBig;
		default:
			return WALL.heightSmall;
	}
}

function randomWallType(){
	const bounceWallProb = prob25()	;
	if(bounceWallProb){
		return 2;
	} else {
		return 1;
	}

}

export {randomWallHeight, randomWallType};
