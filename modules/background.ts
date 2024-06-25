import { ctx } from "./canvas.ts";
import { GAME_MOVEMENT } from "../utils/constants.ts";



// create background images using different layer of images
export default class Background {
	x: number;
	y: number;
	dy: number;

	// backgroudn sky
	skyLoaded: boolean;
	skyImg: HTMLImageElement;

	//rock background
	rockBackgroundLoaded;
	rockBackgroundImg: HTMLImageElement;

	//rock background
	rockLoaded;
	rockImg: HTMLImageElement;

	//rock background
	cloudBackgroundLoaded;
	cloudBackgroundImg: HTMLImageElement;

	//rock background
	cloudLoaded;
	cloudImg: HTMLImageElement;

	constructor(
		posx: number,
		posy: number,
		skysrc: string,
		backgroundrocksrc: string,
		rocksrc: string,
		backgroundcloudsrc: string,
		cloudsrc: string
	) {
		this.x = posx;
		this.y = posy;
		this.dy = GAME_MOVEMENT;

		// background sky
		this.skyImg = new Image();
		this.skyImg.src = skysrc;
		this.skyLoaded = false;
		this.skyImg.onload = () => {
			this.skyLoaded = true;
			this.draw();
		};

		// rock background img
		this.rockBackgroundImg = new Image();
		this.rockBackgroundImg.src = backgroundrocksrc;
		this.rockBackgroundLoaded = false;
		this.rockBackgroundImg.onload = () => {
			this.rockBackgroundLoaded = true;
			this.draw();
		};

		// rock img
		this.rockImg = new Image();
		this.rockImg.src = rocksrc;
		this.rockLoaded = false;
		this.rockImg.onload = () => {
			this.rockLoaded = true;
			this.draw();
		};

		// cloud background img
		this.cloudBackgroundImg = new Image();
		this.cloudBackgroundImg.src = backgroundcloudsrc;
		this.cloudBackgroundLoaded = false;
		this.cloudBackgroundImg.onload = () => {
			this.cloudBackgroundLoaded = true;
			this.draw();
		};

		// cloud img
		this.cloudImg = new Image();
		this.cloudImg.src = cloudsrc;
		this.cloudLoaded = false;
		this.cloudImg.onload = () => {
			this.cloudLoaded = true;
			this.draw();
		};
	}

	draw() {
		if (
			this.skyLoaded &&
			this.rockBackgroundLoaded &&
			this.cloudBackgroundLoaded &&
			this.cloudLoaded
		) {
			ctx.drawImage(this.skyImg, this.x, this.y);
			ctx.drawImage(this.rockBackgroundImg, this.x, this.y);
			ctx.drawImage(this.rockImg, this.x, this.y);
			ctx.drawImage(this.cloudBackgroundImg, this.x, this.y);
			ctx.drawImage(this.cloudImg, this.x, this.y);
		}
	}

	moveInY(){
		this.y += this.dy;
	}

}
