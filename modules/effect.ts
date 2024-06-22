import { ctx } from "../modules/canvas.ts";
import { GAME_MOVEMENT } from "../utils/constants.ts";

export default class Effect {
	x: number;
	y: number;
	dy: number;
	w: number;
	h: number;
	img: HTMLImageElement;
	loaded: boolean;
    duration:number;

	constructor(posx: number, posy: number, imgsrc: string) {
		this.x = posx;
		this.y = posy;
		this.w = 32;
		this.h = 48;
        this.dy = GAME_MOVEMENT;

		this.loaded = false;
		this.img = new Image();
		this.img.src = imgsrc;
        this.duration = 0;

		this.img.onload = () => {
			this.loaded = true;
			this.draw();
		};
	}

	draw() {
		if (this.loaded)
			ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
	}
    
    setDuration(duration:number){
        this.duration = duration;
    }

    getDuration(){
        return this.duration;
    }

    moveInY(){
        this.y += this.dy;
    }
}
