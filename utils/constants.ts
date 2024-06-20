import { canvas } from "../modules/canvas";
import Blade from "../modules/blade.ts";

const GAME_MOVEMENT = 2;

const CANVAS_SIZE = {
	width: canvas.width,
	height: canvas.height,
}

const MAIN_WALL= {
	x: 0,
	y:-64,
	width: 64,
	height: CANVAS_SIZE.height+ 100,
}

const WALL = {
	width: 10,	
	heightSmall : 72,
	heightBig: 160,
	//wall separation in x-axis
	gapX: 150, 
	//wall separation in y-axis
	gapY: 150,
}

//player movement speed
const PLAYERDX:number = 8;
const PLAYERDY:number = -6;

//spikes contants
const SPIKE_SIZE = {
	width: 24,
	height: 24,
}

//blade constants 
const BALDE_SIZE = {
	width: 32,
	height:32,
};

// enemy constants 
const ENEMY_SIZE = {
	width: 32,
	height:32,
}

//blade movement range
const BLADE_RANGE = 100;

export type Direction = "horizontal" | "vertical";
export type obstacleFace = "right" | "left"

// TODO make type for GameState global variable
export type GameState = {
	blades:Blade[];


}


const INITX = 0 + MAIN_WALL.width;
const INITY = CANVAS_SIZE.height/2;

export {
	CANVAS_SIZE,
	MAIN_WALL,
	WALL,
	PLAYERDX,
	PLAYERDY,
	ENEMY_SIZE,
	SPIKE_SIZE,
	GAME_MOVEMENT,
	BLADE_RANGE,
	INITX,
	INITY,
	BALDE_SIZE
};
