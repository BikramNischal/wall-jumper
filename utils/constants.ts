import { canvas } from "../modules/canvas";

const CANVAS_WIDTH: number = canvas.width;
const CANVAS_HEIGHT: number = canvas.height;

const WALL_WIDTH: number = 8;
const WALL_HEIGHT_SMALL: number = 64;
const WALL_HEIGHT_MEDIUM: number = 128;
const WALL_HEIGHT_BIG: number = 256;

// Wall separation in x-axis
const WALL_X_GAP = 200;
//wall separation in y-axis
const WALL_Y_GAP = 150;

export {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	WALL_WIDTH,
	WALL_HEIGHT_BIG,
	WALL_HEIGHT_MEDIUM,
	WALL_HEIGHT_SMALL,
    WALL_X_GAP,
    WALL_Y_GAP
};
