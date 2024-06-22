import { ctx } from "../modules/canvas.ts";
import {
	CANVAS_SIZE,
	GameState,
	INITX,
	INITY,
	MAIN_WALL,
	GameLoop,
} from "../utils/constants.ts";
import {
	generateWalls,
	generateBlades,
	generateDemons,
	generateMainSpikes,
	generateDemon,
	generateSpider,
	generateSpiders,
} from "./generateGameObjects.ts";

import {
	updateWalls,
	updateBlades,
	updateEnemys,
	updateMainSpikes,
} from "./updateGameObjects.ts";

import { displayGame, displayRestartMenu } from "./handleWindow.ts";

import Player from "../modules/player.ts";
import Wall from "../modules/wall.ts";
import { prob25 } from "../utils/random.ts";
import Blade from "../modules/blade.ts";

// Game Menu and Game Window  references
const startBtn = document.querySelector(".btn--start") as HTMLButtonElement;
const restartBtn = document.querySelector(".btn--restart") as HTMLButtonElement;

const gameStatus: GameLoop = {
	pause: false,
	clickState: false,
	restart: false,
};

const generateGameState = () => {
	return {
		blades: generateBlades(2),
		mainWall: new Wall(
			MAIN_WALL.x,
			MAIN_WALL.y,
			0,
			"./images/main-platform.png"
		),
		walls: generateWalls(4),
		player: new Player(INITX, INITY, "./images/grab-left.png"),
		gameSpeed: 0,
		demons: generateDemons(),
		spiders: generateSpiders(),
		mainWallSpikes: generateMainSpikes(),
	};
};

// ================== Testing area =======================

// ======================================================

let gameState: GameState = generateGameState();

function Game(gameState: GameState) {
	ctx.clearRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
	++gameState.gameSpeed;

	// random enemy generation
	if (gameState.gameSpeed % 500 === 0) {
		const makeEnemy = prob25();
		if (makeEnemy) gameState.demons.push(generateDemon());
	}

	updateEnemys(gameState.demons, "demon");

	// gameState.demons.forEach((demon) => {
	// 	demon.draw(gameState.gameSpeed);
	// 	if (gameState.player.isColliding(demon)) {
	// 		displayRestartMenu(gameStatus);
	// 		return;
	// 	}
	// });

	for (let i = 0; i < gameState.demons.length && !gameStatus.restart; ++i) {
		const demon = gameState.demons[i];
		demon.draw(gameState.gameSpeed);
		if (gameState.player.isColliding(demon)) {
			gameStatus.restart = true;
			displayRestartMenu(gameStatus);
			return;
		}
	}

	//draw main wall
	gameState.mainWall.draw();

	if (gameState.gameSpeed % 300 === 0) {
		const makeEnemy = prob25();
		if (makeEnemy) gameState.spiders.push(generateSpider());
	}

	updateEnemys(gameState.spiders, "spider");


	// gameState.spiders.forEach((spider) => {
	// 	spider.drawVertical(gameState.gameSpeed);
	// 	if (gameState.player.isColliding(spider)) {
	// 		displayRestartMenu(gameStatus);
	// 		return;
	// 	}
	// });

	for (let i = 0; i < gameState.spiders.length && !gameStatus.restart; ++i) {
		const spider = gameState.spiders[i];
		spider.drawVertical(gameState.gameSpeed);
		if (gameState.player.isColliding(spider)) {
			gameStatus.restart = true;
			displayRestartMenu(gameStatus);
			return;
		}
	}

	// gameState.mainWallSpikes.forEach((spike) => {
	// 	spike.moveInY();
	// 	spike.draw();
	// 	if (gameState.player.isColliding(spike)) {
	// 		displayRestartMenu(gameStatus);
	// 		return;
	// 	}
	// });

	for(let i =0; i< gameState.mainWallSpikes.length && !gameStatus.restart; ++i){
		const spike = gameState.mainWallSpikes[i];
		spike.moveInY();
		spike.draw();
		if(gameState.player.isColliding(spike)){
			gameStatus.restart = true;
			displayRestartMenu(gameStatus);
			return;
		}
	}

	//Player  movement and rendering
	// move player down with gamespeed
	gameState.player.moveInY();

	// check for collision in the main wall
	gameState.player.collisionWall(gameState.mainWall);

	// rander player image
	if (gameState.player.jumpCount) {
		gameState.player.draw();
	} else gameState.player.drawJumpSprite(gameState.gameSpeed);

	// make player jump
	if (gameState.player.isJumping) {
		gameState.player.jump();
	}

	//move walls  and spikes  down and check for collision
	// gameState.walls.forEach((wall) => {
	// 	wall.moveInY();
	// 	wall.draw();
	// 	if (wall.effect) {
	// 		wall.effect.draw();
	// 	}

	// 	if (wall.spike) {
	// 		wall.spike.draw();
	// 		if (gameState.player.isColliding(wall.spike)) {
	// 			displayRestartMenu(gameStatus);
	// 			return;
	// 		}
	// 	}
	// 	gameState.player.collisionWall(wall);
	// });

	for(let i =0; i < gameState.walls.length && !gameStatus.restart; ++i){
		const wall = gameState.walls[i];
		wall.moveInY();
		wall.draw();

		if(wall.effect){
			wall.effect.draw();
		}

		if(wall.spike){
			wall.spike.draw();
			if(gameState.player.isColliding(wall.spike)){
				gameStatus.restart = true;
				displayRestartMenu(gameStatus);
				return;
			}
		}
		gameState.player.collisionWall(wall);
	}


	//move blades down and check collision
	//TODO Collision detection

	// gameState.blades.forEach((blade) => {
	// 	blade.moveInY();
	// 	blade.draw();
	// 	blade.oscillate();
	// 	if (gameState.player.isColliding(blade)) {
	// 		displayRestartMenu(gameStatus);
	// 		return;
	// 	}
	// });


	for(let i = 0; i< gameState.blades.length; ++i){
		const blade = gameState.blades[i];
		blade.moveInY();
		blade.draw();
		blade.oscillate();

		if(gameState.player.isColliding(blade)){
			gameStatus.restart = true;
			displayRestartMenu(gameStatus);
			return;
		}
	}

	// update walls and blades
	updateBlades(gameState.blades);
	updateWalls(gameState.walls);
	updateMainSpikes(gameState.mainWallSpikes);

	if (gameStatus.pause) return;
	// if(gameStatus.restart){
	// 	return;
	// }

	requestAnimationFrame(() => Game(gameState));
}

function gameLoop() {	
	
	//display and start game window
	startBtn.onclick = () => {
		gameStatus.clickState = false;
		displayGame(gameStatus);
		gameState.mainWall.setMainWall();
		Game(gameState);
	};


	restartBtn.onclick = () => {
		gameStatus.clickState = false;
		gameStatus.restart = false;
		displayGame(gameStatus);
		gameState = generateGameState();
		gameState.mainWall.setMainWall();
		console.log(gameState);
		Game(gameState);
	};

	document.addEventListener("click", () => {
		// jump only if game is not pause
		if (!gameStatus.pause && gameStatus.clickState) {
			ctx.clearRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
			if (gameState.player.jumpCount > 0) {
				gameState.player.isJumping = true;
				gameState.player.resetJump();
				--gameState.player.jumpCount;
			}
		}
	});

	document.addEventListener("keydown", (event) => {
		//pause game on SPACE press
		if (event.key === " " && gameStatus.pause) {
			gameStatus.pause = false;
			Game(gameState);
		} else if (event.key === " ") gameStatus.pause = true;
	});

}

gameLoop();
