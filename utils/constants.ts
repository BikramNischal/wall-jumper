import { canvas } from "../modules/canvas";

const GAME_MOVEMENT = 10;

const CANVAS_WIDTH: number = canvas.width;
const CANVAS_HEIGHT: number = canvas.height;

const WALL_WIDTH: number = 8;
const WALL_HEIGHT_SMALL: number = 72;
const WALL_HEIGHT_MEDIUM: number = 160;
const WALL_HEIGHT_BIG: number = 256;
// Wall separation in x-axis
const WALL_X_GAP = 150;
//wall separation in y-axis
const WALL_Y_GAP = 50;

//blade movement range
const BLADE_RANGE = 50;

export type Direction = "horizontal" | "vertical";


const INITX = CANVAS_WIDTH / 3;
const INITY = CANVAS_HEIGHT - 2 * WALL_HEIGHT_SMALL;

export {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	WALL_WIDTH,
	WALL_HEIGHT_BIG,
	WALL_HEIGHT_MEDIUM,
	WALL_HEIGHT_SMALL,
	WALL_X_GAP,
	WALL_Y_GAP,
	GAME_MOVEMENT,
	BLADE_RANGE,
	INITX,
	INITY
};
