import { canvas } from "../modules/canvas";

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
	gapX: 150,
	gapY: 150,
}

const WALL_WIDTH: number = 10;
const WALL_HEIGHT_SMALL: number = 72;
const WALL_HEIGHT_MEDIUM: number = 160;
const WALL_HEIGHT_BIG: number = 256;

// Wall separation in x-axis
const WALL_X_GAP = 150;
//wall separation in y-axis
const WALL_Y_GAP = 150;


//player movement speed
const PLAYERDX:number = 8;
const PLAYERDY:number = -6;

//blade constants 
const BALDE_SIZE = {
	width: 32,
	height:32,
};

//blade movement range
const BLADE_RANGE = 100;

export type Direction = "horizontal" | "vertical";
export type obstacleFace = "right" | "left"


const INITX = 0 + MAIN_WALL.width;
const INITY = CANVAS_SIZE.height/2;

export {
	CANVAS_SIZE,
	MAIN_WALL,
	WALL,
	WALL_WIDTH,
	WALL_HEIGHT_BIG,
	WALL_HEIGHT_MEDIUM,
	WALL_HEIGHT_SMALL,
	WALL_X_GAP,
	WALL_Y_GAP,
	PLAYERDX,
	PLAYERDY,
	GAME_MOVEMENT,
	BLADE_RANGE,
	INITX,
	INITY,
	BALDE_SIZE
};
