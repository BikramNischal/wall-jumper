import { ctx } from "./canvas.ts";
import Obstacle from "./obstacle.ts";
import { obstacleFace } from "../utils/constants.ts";
import random  from "../utils/random.ts";

export default class Spike extends Obstacle {
face: obstacleFace;
	constructor(posx: number, posy: number, face: obstacleFace) {
		super(posx, posy);
		this.face = face;
		this.w = 24;
		this.h = 24;
		this.selectSpike();
	}

	selectSpike() {
		// select spike
		// true = spike1
		// false = spike2
		const spikeType: number = random(100);
		if (this.face === "right") {
			if (spikeType % 3 === 0) {
				this.img.src = "./images/spike1-right.png";
			}else if(spikeType % 3 === 1) {
				this.img.src = "./images/spike2-right.png";
			} else {
				this.img.src = "./images/trap-right.png";
			}
		} else {
			if (spikeType % 3 === 0) {
				this.img.src = "./images/spike1-left.png";
			} else if(spikeType % 3 === 1) {
				this.img.src = "./images/spike2-left.png";
			} else {
				this.img.src = "./images/trap-left.png";
			}
		}

		this.img.onload = () => {
			this.loaded = true;
		};
	}

	draw() {
		if (this.loaded) {
			ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
		}
	}

	moveInY(gameSpeed:number) {
		this.y += gameSpeed;
	}	
}
