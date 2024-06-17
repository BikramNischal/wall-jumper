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

	constructor(posx: number, posy: number, imgsrc: string) {
		this.x = posx;
		this.y = posy;
		this.dx = 2;
		this.dy = 2;
		this.w = 32;
		this.h = 32;

		this.loaded = false;
		this.img = new Image();
		this.img.src = imgsrc;

		this.img.onload = () => {
			this.loaded = true;
			this.draw();
			// Draw the outline
			ctx.strokeStyle = "red"; // Set the outline color
			ctx.lineWidth = 2; // Set the outline width
			ctx.strokeRect(this.x, this.y, this.w, this.h);
		};
	}

	draw() {
		if (this.loaded)
			ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

        
	}
}
