import { ctx } from "./canvas.ts";
import {
	WALL_WIDTH,
	WALL_HEIGHT_BIG,
	WALL_HEIGHT_MEDIUM,
	WALL_HEIGHT_SMALL,
	GAME_MOVEMENT
} from "../utils/constants.ts";

import random from "../utils/random.ts";
import {calcx} from "../utils/generatePosition.ts";

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
		this.dy = GAME_MOVEMENT;
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


export { calcx, randomWallHeight };
