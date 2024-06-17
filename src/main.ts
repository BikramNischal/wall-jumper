import { ctx } from "../modules/canvas.ts";
import { CANVAS_HEIGHT, CANVAS_WIDTH, WALL_HEIGHT_SMALL } from "../utils/constants.ts";

import {
	generateWalls,
	generateBlades,
	updateWalls,
	updateBlades,
} from "./generateGameObjects.ts";

import Blade from "../modules/blade.ts";
import random from "../utils/random.ts";
import Player from "../modules/player.ts";
import Wall from "../modules/wall.ts";
// import { calcx } from "../modules/wall.ts";



const gameWindow = document.querySelector(".game-window") as HTMLDivElement;
let walls: Wall[] = generateWalls(4);
const blades: Blade[] = generateBlades(random(4));

const initX = CANVAS_WIDTH/3;
const initY = CANVAS_HEIGHT - 2*WALL_HEIGHT_SMALL;

const startWall = new Wall(initX,initY,"normal", "./images/normal-wall.png");
const player =  new Player(initX+startWall.w,initY+WALL_HEIGHT_SMALL/2,"./images/grab-left.png");

walls  = [startWall, ...walls];

function Game() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	player.draw();
	walls.forEach((wall) => wall.draw());
	blades.forEach((blade) => {
		blade.draw();
		blade.oscillate()
	});

	requestAnimationFrame(Game);
}

gameWindow.addEventListener("click", () => {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	updateWalls(walls);
	updateBlades(blades);
});

Game();
