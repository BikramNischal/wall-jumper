import { ctx } from "../modules/canvas.ts";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../utils/constants.ts";

import {
	generateWalls,
	generateBlades,
	updateWalls,
	updateBlades,
} from "./generateGameObjects.ts";

import Blade from "../modules/blade.ts";
import random from "../utils/random.ts";



const gameWindow = document.querySelector(".game-window") as HTMLDivElement;
const walls = generateWalls(4);
const blades: Blade[] = generateBlades(random(4));

function Game() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
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
