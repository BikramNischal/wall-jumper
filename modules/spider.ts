import Enemy from "./enemy";
import { ctx } from "./canvas";



export default class Spider extends Enemy{
    
    constructor(
		posx: number,
		posy: number,
		imgsrc: string,
		spriteWidth: number,
		spriteHeight: number,
		totalFrame: number
    ){
        super(posx,posy,imgsrc,spriteWidth,spriteHeight,totalFrame);
    }

	draw(gameSpeed:number) {
		if (this.loaded)
			ctx.drawImage(
				this.img,
				0,
				this.currentFrame * this.spriteHeight,
				this.spriteWidth,
				this.spriteHeight,
				this.x,
				this.y,
				this.w,
				this.h
			);
		
		if(gameSpeed%10 === 0)
			this.currentFrame = (this.currentFrame+1)%this.totalFrame;
	}

	moveInY(gameSpeed:number) {
		this.y +=  gameSpeed+1;
	}



}