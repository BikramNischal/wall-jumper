import Enemy from "./enemy.ts";
import { MAIN_WALL,CANVAS_SIZE } from "../utils/constants.ts";

export default class Demon extends Enemy {
	constructor(
		posx: number,
		posy: number,
		imgsrc: string,
		spriteWidth: number,
		spriteHeight: number,
		totalFrame: number
	) {
		super(posx, posy, imgsrc, spriteWidth, spriteHeight, totalFrame);
	}

	// change direction of demon on x-axis
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
