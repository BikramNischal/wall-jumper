import { ctx } from "./canvas";
import Obstacle from "./obstacle";
import Wall from "./wall";

export default class Player {
	x: number;
	y: number;
	dx: number;
	dy: number;
	w: number;
	h: number;
	img: HTMLImageElement;
	loaded: boolean;
	horizontalDelay: number;
	gravity: number;
	jumpHeight: number;
	isJumping: boolean;
	jumpCount: number;
	xDirection: number;

	constructor(posx: number, posy: number, imgsrc: string) {
		this.x = posx;
		this.y = posy;
		this.w = 32;
		this.h = 32;

		// movement agents and variables
		this.xDirection = 1;
		this.dx = 5;
		this.dy = -12;
		this.horizontalDelay = 0.1;
		this.gravity = 0.5;
		this.jumpHeight = -10;
		this.isJumping = false;
		this.jumpCount = 2;

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
			ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

		// image outline FOR TESTING ONLY
		ctx.beginPath();
		ctx.fillStyle = "red";
		ctx.strokeStyle = "red";
		ctx.rect(this.x, this.y, this.w, this.h);
		ctx.stroke();
	}

	resetJump() {
		if (this.jumpCount === 1) this.xDirection *= -1;
		this.dx = 5 * this.xDirection;
		this.dy = -12;
	}

	changeJumpingImage() {
		//jumping image
		if (this.dx > 0 && this.jumpCount === 2) {
			this.img.src = "./images/jump-right.png";
		} else if (this.dx < 0 && this.jumpCount === 2) {
			this.img.src = "./images/jump-left.png";
		} else if (this.dx > 0 && this.jumpCount === 1) {
			this.img.src = "./images/mid-jump-right.png";
		} else {
			this.img.src = "./images/mid-jump-left.png";
		}
	}

	jump() {
		this.changeJumpingImage();
		this.dy += this.gravity;
		this.dx =
			this.dx > 0
				? this.dx - this.horizontalDelay
				: this.dx + this.horizontalDelay;
		this.x += this.dx;
		this.y += this.dy;

		// Limit falling speed
		if (this.dy > 10) {
			this.dy = 10;
		}
	}

	isColliding(object: Wall | Obstacle) {
		return (
			object.x < this.x + this.w &&
			object.x + object.w > this.x &&
			object.y < this.y + this.h / 2 &&
			object.y + object.h > this.y
		);
	}

	collision(object: Wall | Obstacle) {
		if (this.isColliding(object)) {
			this.jumpCount = 2;
			this.isJumping = false;
		}

		// Adjust this position based on collision side
		const dx = this.x + this.w / 2 - (object.x + object.w / 2);
		const dy = this.y + this.h / 2 - (object.y + object.h / 2);
		const width = (this.w + object.w) / 2;
		const height = (this.h + object.h) / 2;
		const crossWidth = width * dy;
		const crossHeight = height * dx;

		if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
			if (crossWidth > crossHeight) {
				if (crossWidth > -crossHeight) {
					// Collision on the bottom side
					this.y = object.y + object.h;
					this.x -= this.w;
				} else {
					// Collision on the left side
					this.x = object.x - this.w;
					this.xDirection = -1;
					this.img.src = "./images/grab-right.png";
				}
			} else {
				if (crossWidth > -crossHeight) {
					// Collision on the right side
					this.x = object.x + object.w;
					this.xDirection = 1;
					this.img.src = "./images/grab-left.png"
				} else {
					// Collision on the top side
					this.y = object.y - this.h;
					this.x += this.w;
				}
			}
		}
	}
}
