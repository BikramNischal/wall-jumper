import { ctx } from "./canvas.ts";
import Obstacle from "./obstacle.ts";
import { obstacleFace } from "../utils/constants.ts";
import { prob50 } from "../utils/random.ts";

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
		const spikeType: boolean = prob50();
		if (this.face === "right") {
			if (spikeType) {
				this.img.src = "./images/spike1-right.png";
			} else {
				this.img.src = "./images/spike2-right.png";
			}
		} else {
			if (spikeType) {
				this.img.src = "./images/spike1-left.png";
			} else {
				this.img.src = "./images/spike2-left.png";
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

	drawSpike(imgsrc: string) {
		this.img.src = imgsrc;
		this.img.onload = () => {
			this.loaded = true;
			this.draw();
		};
	}
}

// generate spicke according to the face and type
export function generateSpike() {
	const face = prob50() ? "right" : "left";
	let spike: Spike = new Spike(0, 0, face);
	return spike;
}
