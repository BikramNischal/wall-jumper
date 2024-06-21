import { ctx } from "../modules/canvas.ts";
import { CANVAS_SIZE, GameState, INITX, INITY, MAIN_WALL, GameLoop } from "../utils/constants.ts";
import {
	generateWalls,
	generateBlades,
	updateWalls,
	updateBlades,
	generateDemons,
	generateMainSpikes,
	updateMainSpikes,
	generateDemon,
	generateSpider,
	generateSpiders,
	updateEnemys,
} from "./generateGameObjects.ts";
import { displayGame, displayRestartMenu } from "./handleWindow.ts";

import Player from "../modules/player.ts";
import Wall from "../modules/wall.ts";
import { prob25 } from "../utils/random.ts";

// Game Menu and Game Window  references
const startBtn = document.querySelector(".btn--start") as HTMLButtonElement;
const restartBtn = document.querySelector(".btn--restart") as HTMLButtonElement;

const gameloop: GameLoop = {
	pause: false,
	start: false,
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
	gameState.demons.forEach((demon) => {
		demon.draw(gameState.gameSpeed);
		if (gameState.player.isColliding(demon)) displayRestartMenu(gameloop);
	});

	//check for demons for move and render
	// move player down with gamespeed
	gameState.player.moveInY();

	//draw main wall
	gameState.mainWall.draw();

	if (gameState.gameSpeed % 300 === 0) {
		const makeEnemy = prob25();
		if (makeEnemy) gameState.spiders.push(generateSpider());
	}

	updateEnemys(gameState.spiders, "spider");
	gameState.spiders.forEach((spider) => {
		spider.drawVertical(gameState.gameSpeed);
		if (gameState.player.isColliding(spider)) {
			displayRestartMenu(gameloop);
		}
	});

	gameState.mainWallSpikes.forEach((spike) => {
		spike.moveInY();
		spike.draw();
		if (gameState.player.isColliding(spike)) {
			displayRestartMenu(gameloop);
		}
	});

	// check for collision in the main wall
	gameState.player.collisionWall(gameState.mainWall);
	if (gameState.player.jumpCount) gameState.player.draw();
	else gameState.player.drawJumpSprite(gameState.gameSpeed);

	if (gameState.player.isJumping) {
		gameState.player.jump();
	}

	//move walls  and spikes  down and check for collision
	gameState.walls.forEach((wall) => {
		wall.moveInY();
		wall.draw();
		if (wall.spike) {
			wall.spike.draw();
			if (gameState.player.isColliding(wall.spike)) {
				displayRestartMenu(gameloop);
			}
		}
		gameState.player.collisionWall(wall);
	});

	//move blades down and check collision
	//TODO Collision detection
	gameState.blades.forEach((blade) => {
		blade.moveInY();
		blade.draw();
		blade.oscillate();
		if (gameState.player.isColliding(blade)) {
			displayRestartMenu(gameloop);
		}
	});

	// update walls and blades
	updateBlades(gameState.blades);
	updateWalls(gameState.walls);
	updateMainSpikes(gameState.mainWallSpikes);

	if (gameloop.pause) return;

	requestAnimationFrame(() => Game(gameState));
}

function gameLoop() {
	//display and start game window
	startBtn.onclick = () => {
		gameloop.start = false;
		displayGame(gameloop);
		gameState.mainWall.setMainWall();
		Game(gameState);
	};

	restartBtn.onclick = () => {
		gameloop.start = false;
		displayGame(gameloop);
		gameState = generateGameState();
		gameState.mainWall.setMainWall();
		Game(gameState);
	};

	document.addEventListener("click", () => {
		// jump only if game is not pause
		if (!gameloop.pause && gameloop.start) {
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
		if (event.key === " " && gameloop.pause) {
			gameloop.pause = false;
			Game(gameState);
		} else if (event.key === " ") gameloop.pause = true;
	});
}

gameLoop();
