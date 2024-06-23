import { canvas } from "../modules/canvas";
import Blade from "../modules/blade.ts";
import Wall from "../modules/wall.ts";
import Player from "../modules/player.ts";
import Demon from "../modules/demon.ts";
import Spider from "../modules/spider.ts";
import Spike from "../modules/spike.ts";

const GAME_MOVEMENT = 2;
const GAME_MOVEMENT_OFFSET = GAME_MOVEMENT + 1; 

const CANVAS_SIZE = {
	width: canvas.width,
	height: canvas.height,
}

const MAIN_WALL= {
	x: 0,
	y:-64,
	width: 64,
	height: CANVAS_SIZE.height+ 100,
	xOffSet: 5,
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
const PLAYER_MOVEMENT = {
	dx: 8,
	dy: -6,
}
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
	width: 24,
	height:24,
}

//blade movement range
const BLADE_RANGE = 100;

export type Direction = "horizontal" | "vertical";
export type obstacleFace = "right" | "left"


// stores the status of gameloop
export type GameLoop = {
	pause:boolean;
	clickState:boolean;
	restart:boolean;
	gameMovement: number;
}

export type Score = {
	name:string;
	value:number;
}

export type GameState = {
	blades:Blade[];
	mainWall: Wall;
	walls: Wall[];
	player: Player;
	gameSpeed: number;
	demons: Demon[];
	spiders: Spider[];
	mainWallSpikes: Spike[];
	score:number;
	userName: string;
}


const INITX = 0 + MAIN_WALL.width;
const INITY = CANVAS_SIZE.height/2;

export {
	CANVAS_SIZE,
	MAIN_WALL,
	WALL,
	PLAYER_MOVEMENT,
	PLAYERDX,
	PLAYERDY,
	ENEMY_SIZE,
	SPIKE_SIZE,
	GAME_MOVEMENT,
	BLADE_RANGE,
	INITX,
	INITY,
	BALDE_SIZE,
	GAME_MOVEMENT_OFFSET
};
