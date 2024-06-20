import { CANVAS_SIZE,WALL} from "./constants";
import random, { randomRange } from "./random.ts";


// calculate the x position of the wall to be generated
// the x postion of the wall is in between 25% of the canvas to 75% of the canvas
// i.e CANVAS_WIDTH/4 TO CANVAS_WIDTH * 3/4
export function calcx() {
	//get random x from 0 to middle of canvas
	const xRandom = random(CANVAS_SIZE.width/2);

	// translate x such that it fall beyound 1/4 of canvas width
	const xTranslate = CANVAS_SIZE.width * 2/5 + xRandom;

	// add wall gap in x-axis
	const xWithGap = xTranslate + WALL.gapX;

	// adjust X such that its fall in range CANVAS_WIDTH/4 TO CANVAS_WIDTH*3/4
	const adjustX =
		xWithGap > CANVAS_SIZE.width*.075
			? xWithGap - CANVAS_SIZE.width / 2
			: xWithGap;


	return adjustX;
}

export function getWallXPos(){
	const lowerBound = (1/2) * CANVAS_SIZE.width;
	const upperBound = (3/4) * CANVAS_SIZE.width;

	return (randomRange(lowerBound, upperBound));
}

