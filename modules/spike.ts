import { ctx } from "./canvas.ts";
import Obstacle from "./obstacle.ts";
import { obstacleFace } from "../utils/constants.ts";
import random from "../utils/random.ts";
import { prob50 } from "../utils/random.ts";

export default class Spike extends Obstacle {
	face: obstacleFace;
	constructor(posx: number, posy: number,face: obstacleFace) {
		super(posx, posy);
		this.face = face;
        this.w = 32;
        this.h = 32;
        this.selectSpike();
        // this.img.onload = () => {
        //     this.loaded = true;
        // }
	}

	selectSpike() {
		const spikeType: number = random(4);
        // const spikeType= 1;
		if (this.face === "right") {
			switch (spikeType) {
				case 1:
					this.img.src = "./images/spike1-right.png";
					break;
				case 2:
					this.img.src = "./images/spike2-right.png";
					break;
				case 3:
					this.img.src = "./images/spike3-right.png";
					break;
				default:
					this.img.src = "./images/spike2-right.png";
					break;
			}
		} else {
			switch (spikeType) {
				case 1:
					this.img.src = "./images/spike1-left.png";
					break;
				case 2:
					this.img.src = "./images/spike2-left.png";
					break;
				case 3:
					this.img.src = "./images/spike3-left.png";
					break;
				default:
					this.img.src = "./images/spike2-left.png";
					break;
			}
		}

        this.img.onload = () => {
            this.loaded = true;         
        }
	}

	draw() {
		if (this.loaded) {
			ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
		}
	}

    drawSpike(imgsrc:string){
        this.img.src= imgsrc;
        this.img.onload = () => {
            this.loaded = true;
            this.draw();
        }
    }
}

// generate spicke according to the face and type
export function generateSpike(){
	const face = prob50() ? "right" : "left";
	let spike: Spike = new Spike(200,200,face);
	return spike;
}