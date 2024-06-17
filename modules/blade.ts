import { MovingObstacle } from "./obstacle";
import { Direction } from "../utils/constants";
import { ctx } from "./canvas";

export default class Blade extends MovingObstacle {
	spriteWidth: number;
    spriteHeight: number;
    currentFrame: number;
    totalFrame:number;

	constructor(
		posx: number,
		posy: number,
		direction: Direction,
		imgsrc: string,
		start: number,
		end: number
	) {
		super(posx, posy, direction, imgsrc, start, end);
        this.spriteHeight= 166;
        this.spriteWidth= 164.5;
        this.currentFrame = 0;
        this.totalFrame = 5;
        this.h = 32;
        this.w = 32;
		this.dx= 1;

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

        this.currentFrame = (this.currentFrame+1) % this.totalFrame;
	}

}
