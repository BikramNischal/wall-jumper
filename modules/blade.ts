import { MovingObstacle } from "./obstacle";
import { BALDE_SIZE, Direction } from "../utils/constants";
import { ctx } from "./canvas";

export default class Blade extends MovingObstacle {
	spriteWidth: number;
	spriteHeight: number;
	currentFrame: number;
	totalFrame: number;

	constructor(
		posx: number,
		posy: number,
		direction: Direction,
		imgsrc: string,
		start: number,
		end: number
	) {
		super(posx, posy, direction, imgsrc, start, end);
		this.spriteHeight = 32;
		this.spriteWidth = 32;
		this.currentFrame = 0;
		this.totalFrame = 8;
		this.h = BALDE_SIZE.height;
		this.w = BALDE_SIZE.width;
		this.dx = 1;
		this.pointValue = 2;
	}

	draw() {
		if (this.loaded)
			ctx.drawImage(
				this.img,
				this.currentFrame * this.spriteWidth,
				0,
				this.spriteWidth,
				this.spriteHeight,
				this.x,
				this.y,
				this.w,
				this.h
			);

		this.currentFrame = (this.currentFrame + 1) % this.totalFrame;
	}
}
