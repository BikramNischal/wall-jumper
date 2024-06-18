import { ctx } from "./canvas.ts";
import { GAME_MOVEMENT, Direction } from "../utils/constants.ts";

export default class Obstacle {
	x: number;
	y: number;
	dx: number;
	dy: number;
	direction: Direction;
	w: number;
	h: number;
	img: HTMLImageElement;
	loaded: boolean;
	gameDy: number;

	constructor(
		posx: number,
		posy: number,
		direction: Direction,
		imgsrc: string
	) {
		this.x = posx;
		this.y = posy;
		this.dx = 10;
		this.dy = 10;
		this.w = 64;
		this.h = 64;
		this.gameDy = GAME_MOVEMENT;
		this.direction = direction;

		this.loaded = false;
		this.img = new Image();
		this.img.src = imgsrc;
		this.img.onload = () => {
			this.loaded = true;
			this.draw();
		};
	}

	draw() {
		if (this.loaded)
			ctx.drawImage(this.img, this.x, this.y, this.w, this.y);
	}

	//update the obstacle position according to the game flow
	update() {
		this.y += this.gameDy;
	}
}

export class MovingObstacle extends Obstacle {
	startPos: number;
	endPos: number;

	constructor(
		posx: number,
		posy: number,
		direction: Direction,
		imgsrc: string,
		start: number,
		end: number
	) {
		super(posx, posy, direction, imgsrc);
		this.startPos = start;
		this.endPos = end;
	}

	//move the obstacle in the mentioned direction
	oscillate() {
		if (this.direction === "horizontal") {
			if (this.x >= this.endPos) {
				this.dx = -Math.abs(this.dx); // Ensure dx is negative
			} else if (this.x <= this.startPos) {
				this.dx = Math.abs(this.dx); // Ensure dx is positive
			}
			this.x += this.dx;
		} else {
			if (this.y >= this.endPos) {
				this.dy = -Math.abs(this.dy); // Ensure dy is negative
			} else if (this.y <= this.startPos) {
				this.dy = Math.abs(this.dy); // Ensure dy is positive
			}
			this.y += this.dy;
		}
	}
}