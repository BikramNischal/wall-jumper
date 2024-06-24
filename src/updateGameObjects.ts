import Wall, { randomWallHeight } from "../modules/wall.ts";
import Blade from "../modules/blade.ts";
import Spike from "../modules/spike.ts";
import Demon from "../modules/demon.ts";
import Spider from "../modules/spider.ts";

import {
	generateWall,
	generateBlades,
	generateMainSpikes,
} from "./generateGameObjects.ts";
import { WALL, CANVAS_SIZE, GameState} from "../utils/constants.ts";
import random from "../utils/random.ts";

// update walls list
export function updateWalls(walls: Wall[], gameState: GameState) {
	// condition checks if the gap between top most wall and the starting-y of canvas
	// is greater than wall gap in y-axis
	// if true then new wall is created and add to the list
	if (walls.length) {
		const prevWall = walls[walls.length - 1];

		if(prevWall.y > CANVAS_SIZE.height){
			gameState.score += walls[0].pointValue;
			walls.shift();
		}

		if (walls[walls.length - 1].y > WALL.gapY) {
			//this calcuates the y-position of new wall
			const newWallHeight = randomWallHeight();
			const newWallY =
				walls[walls.length - 1].y - WALL.gapY - newWallHeight;
			const newWall = generateWall(prevWall);
			newWall.h = newWallHeight;
			newWall.y = newWallY;
			walls.push(newWall);
		}
	} else {
		walls.push(generateWall(null));
	}
}

//remove blades from array as they go out of canvas
// and generate more blade if the array is empty
export function updateBlades(blades: Blade[], gameState: GameState) {
	blades.forEach((blade) => {
		if (blade.y > CANVAS_SIZE.height) {
			gameState.score += blade.pointValue;
			blades.shift();
		}
	});

	if (blades.length === 0) {
		const newBlades = generateBlades(random(3));
		newBlades.reverse();
		newBlades.forEach((blade) => {
			blade.y *= -1;
		});
		blades.push(...newBlades);
	}
}

// update spikes list of main wall
export function updateMainSpikes(spikes: Spike[], gameState: GameState) {
	spikes.forEach((spike) => {
		if (spike.y > CANVAS_SIZE.height){
			gameState.score += spike.pointValue;
			spikes.shift();
		}
	});

	if (spikes.length === 0) {
		const newSpikes = generateMainSpikes();
		spikes.push(...newSpikes);
	}
}

export function updateDemons(demons: Demon[],gameState:GameState, gameSpeed: number){
	if(demons.length){
		if(demons[0].y > CANVAS_SIZE.height){
			gameState.score += demons[0].pointValue;
			demons.shift();
		}

		demons.forEach((demon) =>{
			demon.moveInY(gameSpeed);
			demon.moveInX();
		})
	}
}

export function updateSider(spiders: Spider[], gameState:GameState, gameSpeed: number){
	if(spiders.length){
		if(spiders[0].y > CANVAS_SIZE.height){
			gameState.score += spiders[0].pointValue;
			spiders.shift();
		}

		spiders.forEach((spider) => {
			spider.moveInY(gameSpeed);
		})
	}
}
