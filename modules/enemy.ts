import { ctx } from "./canvas.ts";
import {
	CANVAS_SIZE,
	ENEMY_SIZE,
	GAME_MOVEMENT,
	MAIN_WALL,
} from "../utils/constants.ts";

export default class Enemy {
	x: number;
	y: number;
	dx: number;
	dy: number;
	w: number;
	h: number;
	img: HTMLImageElement;
	loaded: boolean;
	spriteWidth: number;
	spriteHeight: number;
	currentFrame: number;
	totalFrame: number;

	constructor(
		posx: number,
		posy: number,
		imgsrc: string,
		spriteWidth: number,
		spriteHeight: number,
		totalFrame: number
	) {
		this.x = posx;
		this.y = posy;
		this.dx = -2;
		this.dy = GAME_MOVEMENT;
		this.w = ENEMY_SIZE.width;
		this.h = ENEMY_SIZE.height;

		this.loaded = false;
		this.img = new Image();
		this.img.src = imgsrc;
		this.img.onload = () => {
			this.loaded = true;
		};

		//sprite setup
		this.spriteHeight = spriteHeight;
		this.spriteWidth = spriteWidth;
		this.totalFrame = totalFrame;
		this.currentFrame = 0;

		this.w = 64;
		this.h = 64;
	}

	draw(gameSpeed: number) {
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

		if (gameSpeed % 10 === 0)
			this.currentFrame = (this.currentFrame + 1) % this.totalFrame;
	}

	drawVertical(gameSpeed:number) {
		if (this.loaded)
			ctx.drawImage(
				this.img,
				0,
				this.currentFrame * this.spriteHeight,
				this.spriteWidth,
				this.spriteHeight,
				this.x,
				this.y,
				this.w,
				this.h
			);
		
		if(gameSpeed%10 === 0)
			this.currentFrame = (this.currentFrame+1)%this.totalFrame;
	}

	moveInY() {
		this.y += this.dy ;
	}

	changeDirection() {
		if (
			this.x <= MAIN_WALL.x + MAIN_WALL.width ||
			this.x + this.w >= CANVAS_SIZE.width
		) {
			this.dx *= -1;
			if (this.dx < 0) this.img.src = "./images/demon-left.png";
			else this.img.src = "./images/demon-right.png";
		} else {
			this.dx = this.dx;
		}
	}

	moveInX() {
		this.changeDirection();
		this.x += this.dx;
	}
}
