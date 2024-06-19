import { canvas } from "../modules/canvas";

const GAME_MOVEMENT = 2;

const CANVAS_WIDTH: number = canvas.width;
const CANVAS_HEIGHT: number = canvas.height;

const MAIN_WALL_WIDTH :number = 64;
const MAIN_WALL_HEIGHT:number = CANVAS_HEIGHT + 100;
const MAIN_WALL_X:number = 0;
const MAIN_WALL_Y:number = -64;

const WALL_WIDTH: number = 10;
const WALL_HEIGHT_SMALL: number = 72;
const WALL_HEIGHT_MEDIUM: number = 160;
const WALL_HEIGHT_BIG: number = 256;

// Wall separation in x-axis
const WALL_X_GAP = 150;
//wall separation in y-axis
const WALL_Y_GAP = 150;


//player movement speed
const PLAYERDX:number = 12;
const PLAYERDY:number = -12;
//blade movement range
const BLADE_RANGE = 50;

export type Direction = "horizontal" | "vertical";
export type obstacleFace = "right" | "left"


const INITX = 0 + MAIN_WALL_WIDTH;
const INITY = CANVAS_HEIGHT/2;

export {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	MAIN_WALL_HEIGHT,
	MAIN_WALL_WIDTH,
	MAIN_WALL_X,
	MAIN_WALL_Y,
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
	INITY
};
