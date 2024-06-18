import { ctx } from "./canvas";

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
		this.xDirection = -1;
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
	}

	resetJump(){
		//change direction
		this.xDirection *= -1;	
		this.dx = 5*this.xDirection;
		this.dy = -12;
	}

	jump() {
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


}
