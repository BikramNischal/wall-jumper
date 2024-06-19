import { CANVAS_HEIGHT } from "../utils/constants";
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

	//for jumping animation
	spriteWidth: number;
	spriteHeight: number;
	currentFrame: number;
	totalFrame: number;

	constructor(posx: number, posy: number, imgsrc: string) {
		this.x = posx;
		this.y = posy;
		this.w = 32;
		this.h = 32;

		// movement agents and variables
		this.xDirection = 1;
		this.horizontalDelay = 0.1;
		this.gravity = 0.5;
		this.jumpHeight = -8;
		this.dx = 7;
		this.dy = this.jumpHeight;
		this.isJumping = false;
		this.jumpCount = 2;

		this.loaded = false;
		this.img = new Image();
		this.img.src = imgsrc;

		this.img.onload = () => {
			this.loaded = true;
			this.draw();
		};

		// for airjump sprites
		this.spriteHeight = 67;
		this.spriteWidth = 64;
		this.currentFrame = 0;
		this.totalFrame = 8;
	}

	draw() {
		if (this.loaded)
			ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

		// image outline FOR TESTING ONLY
		// ctx.beginPath();
		// ctx.fillStyle = "red";
		// ctx.strokeStyle = "red";
		// ctx.rect(this.x, this.y, this.w, this.h);
		// ctx.stroke();
	}

	drawJumpSprite() {
		if (this.loaded) {
			ctx.drawImage(
				this.img,
				this.currentFrame * this.spriteWidth,
				0,
				this.spriteWidth,
				this.spriteHeight,
				this.x,
				this.y,
				48,
				48
			);

			this.currentFrame = (this.currentFrame + 1) % this.totalFrame;
		}
	}

	resetJump() {
		if (this.jumpCount === 1) this.xDirection *= -1;
		this.dx = 7 * this.xDirection;
		this.dy = this.jumpHeight;
	}

	changeJumpingImage() {
		//jumping image
		if (this.dx > 0 && this.jumpCount === 1) {
			this.img.src = "./images/jump-right.png";
		} else if (this.dx < 0 && this.jumpCount === 1) {
			this.img.src = "./images/jump-left.png";
		} else if (this.dx > 0 && this.jumpCount === 0) {
			this.img.src = "./images/mid-jump-right-sprite.png";
		} else {
			this.img.src = "./images/mid-jump-left-sprite.png";
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

		if (this.dy > 0) this.y += this.dy;
		else {
			if (this.y > CANVAS_HEIGHT / 4) {
				this.y += this.dy;
			} else {
				this.y = CANVAS_HEIGHT / 4;
			}
		}
		// this.y = CANVAS_HEIGHT / 2;

		// Limit falling speed
		if (this.dy > -this.jumpHeight) {
			this.dy = -this.jumpHeight;
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

	collisionWall(wall: Wall) {
		if (this.isColliding(wall)) {
			this.jumpCount = 2;
			this.isJumping = false;
		}

		// Adjust this position based on collision side
		const dx = this.x + this.w / 2 - (wall.x + wall.w / 2);
		const dy = this.y + this.h / 2 - (wall.y + wall.h / 2);
		const width = (this.w + wall.w) / 2;
		const height = (this.h + wall.h) / 2;
		const crossWidth = width * dy;
		const crossHeight = height * dx;

		if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
			if (crossWidth > crossHeight) {
				if (crossWidth > -crossHeight) {
					// Collision on the bottom side
					this.y = wall.y + wall.h - this.h/2;
					if (this.x < wall.x) this.x = wall.x - this.w;
					else this.x = wall.x + wall.w;
				} else {
					// Collision on the left side
					this.x = wall.x - this.w;
					this.xDirection = -1;
					this.img.src = "./images/grab-right.png";
				}
			} else {
				if (crossWidth > -crossHeight) {
					// Collision on the right side
					this.x = wall.x + wall.w;
					this.xDirection = 1;
					this.img.src = "./images/grab-left.png";
				} else {
					// Collision on the top side
					this.y = wall.y;
					if (this.x < wall.x) this.x = wall.x - this.w;
					else this.x = wall.x + wall.w;
				}
			}
		}
	}
}
