import { randomWallHeight } from "../modules/wall.ts";
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
export function updateWalls(gameState: GameState) {
	// condition checks if the gap between top most wall and the starting-y of canvas
	// is greater than wall gap in y-axis
	// if true then new wall is created and add to the list
	if (gameState.walls.length) {
		const prevWall = gameState.walls[gameState.walls.length - 1];

		if(prevWall.y > CANVAS_SIZE.height){
			gameState.walls.shift();
		}

		if (gameState.walls[gameState.walls.length - 1].y > WALL.gapY) {
			//this calcuates the y-position of new wall
			const newWallHeight = randomWallHeight();
			const newWallY =
				gameState.walls[gameState.walls.length - 1].y - WALL.gapY - newWallHeight;
			const newWall = generateWall(prevWall);
			newWall.h = newWallHeight;
			newWall.y = newWallY;
			gameState.walls.push(newWall);
		}
	} else {
		gameState.walls.push(generateWall(null));
	}
}

//remove blades from array as they go out of canvas
// and generate more blade if the array is empty
export function updateBlades( gameState: GameState) {
	gameState.blades.forEach((blade) => {
		if (blade.y > CANVAS_SIZE.height) {
			gameState.blades.shift();
		}
	});

	if (gameState.blades.length === 0) {
		const newBlades = generateBlades(random(3));
		newBlades.reverse();
		newBlades.forEach((blade) => {
			blade.y *= -1;
		});
		gameState.blades.push(...newBlades);
	}
}

// update spikes list of main wall
export function updateMainSpikes(gameState: GameState) {
	gameState.mainWallSpikes.forEach((spike) => {
		if (spike.y > CANVAS_SIZE.height){
			gameState.mainWallSpikes.shift();
		}
	});

	if (gameState.mainWallSpikes.length === 0) {
		const newSpikes = generateMainSpikes(gameState.score);
		gameState.mainWallSpikes.push(...newSpikes);
	}
}

export function updateDemons(demons: Demon[], gameSpeed: number){
	if(demons.length){
		if(demons[0].y > CANVAS_SIZE.height){
			demons.shift();
		}

		demons.forEach((demon) =>{
			demon.moveInY(gameSpeed);
			demon.moveInX();
		})
	}
}

export function updateSider(spiders: Spider[], gameSpeed: number){
	if(spiders.length){
		if(spiders[0].y > CANVAS_SIZE.height){
			spiders.shift();
		}

		spiders.forEach((spider) => {
			spider.moveInY(gameSpeed);
		})
	}
}
