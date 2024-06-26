import { CANVAS_SIZE, PLAYERDX, PLAYERDY } from "../utils/constants";
import { ctx } from "./canvas";
import Obstacle from "./obstacle";
import Wall from "./wall";
import { normalCollision, rubberCollision } from "../utils/wallcollision.ts";

import Sound from "./sound.ts";
import Enemy from "./enemy.ts";

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
	isJumping: boolean;
	jumpHeight: number;
	jumpCount: number;
	xDirection: number;

	//for jumping animation
	spriteWidth: number;
	spriteHeight: number;
	currentFrame: number;
	totalFrame: number;

	//for sounds
	jumpSound: Sound;
	airJumpSound: Sound;
	fallSound: Sound;

	constructor(posx: number, posy: number, imgsrc: string) {
		this.x = posx;
		this.y = posy;
		this.w = 32;
		this.h = 32;

		// movement agents and variables
		this.xDirection = 1;
		this.horizontalDelay = 0.05;
		this.gravity = 0.1;
		this.jumpHeight = PLAYERDY;
		this.dx = PLAYERDX;
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

		// for player sounds
		this.jumpSound = new Sound("./sounds/jumpsound.m4a");
		this.airJumpSound = new Sound("./sounds/airjumpsound.m4a");
		this.fallSound = new Sound("./sounds/fallsound.m4a");

	}

	draw() {
		if (this.loaded)
			ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
	}


	drawJumpSprite(gameSpeed: number) {
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

			if (gameSpeed % 2 === 0)
				this.currentFrame = (this.currentFrame + 1) % this.totalFrame;
		}
	}

	resetJump() {
		if (this.jumpCount === 1) this.xDirection *= -1;
		this.dx = PLAYERDX * this.xDirection;
		this.dy = this.jumpHeight;
	}

	// change player images according to jump status
	changeJumpingImage() {
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
			if (this.y > 0) {
				this.y += this.dy;
			} else {
				this.dy -= this.dy;
			}
		}

		// Limit falling speed
		if (this.dy > -PLAYERDY) {
			this.dy = -this.jumpHeight;
		}

		if ((this.x + this.w) >= CANVAS_SIZE.width && this.dx > 0) {
			this.jumpCount = 1;
			this.dx = -this.dx;
			this.dy =  this.jumpHeight/2;
		}
	}

	isColliding(object: Wall | Obstacle | Enemy) {
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

			if (wall.type === 2) {
				wall.sound = new Sound("./sounds/rubberbounce1.mp3");
				wall.sound.play();
				--this.jumpCount;
				rubberCollision(this);
			} else if (wall.type === 3) {
				wall.sound = new Sound("./sounds/freezingSound.m4a");
				wall.sound.play();
			}
		}

		normalCollision(this, wall);
	}

	// move player downwards with game speed
	moveInY(gamespeed: number) {
		this.y += gamespeed;
	}
}
