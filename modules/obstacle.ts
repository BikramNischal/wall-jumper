import { ctx } from "./canvas.ts";
import { GAME_MOVEMENT, Direction } from "../utils/constants.ts";
import Sound from "./sound.ts";

export default class Obstacle {
	x: number;
	y: number;
	dx: number;
	dy: number;
	w: number;
	h: number;
	pointValue: number;

	// obstacle image
	img: HTMLImageElement;
	loaded: boolean;
	
	// obstacle collision sound 
	collisionSound : Sound;

	constructor(
		posx: number,
		posy: number
	) {
		this.x = posx;
		this.y = posy;
		this.dx = 10;
		this.dy = 10;
		this.w = 64;
		this.h = 64;
		this.pointValue = 1;

		// obstacle image
		this.loaded = false;
		this.img = new Image();

		//obstacle collision sound 
		this.collisionSound = new Sound("./sounds/obstaclecollision.m4a");

	}


	//update the obstacle position according to the game flow
	moveInY() {
		this.y += GAME_MOVEMENT;
	}
}

export class MovingObstacle extends Obstacle {
	startPos: number;
	endPos: number;
	direction: Direction;

	constructor(
		posx: number,
		posy: number,
		direction: Direction,
		imgsrc: string,
		start: number,
		end: number,
	) {
		super(posx, posy);
		this.startPos = start;
		this.endPos = end;
		this.direction = direction;

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
