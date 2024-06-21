import { canvas, ctx } from "../modules/canvas.ts";
import { CANVAS_SIZE, INITX, INITY, MAIN_WALL } from "../utils/constants.ts";
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
import Player from "../modules/player.ts";
import Wall from "../modules/wall.ts";
import { prob25 } from "../utils/random.ts";

// Game Menu and Game Window  references
const startBtn = document.querySelector(".btn--start") as HTMLButtonElement;
const restartBtn = document.querySelector(".btn--restart") as HTMLButtonElement;
const mainMenu = document.querySelector(".start-menu") as HTMLDivElement;
const restartMenu = document.querySelector(".restart-menu") as HTMLDivElement;

let pause = true;

const GameLoop = {
	pause: false,
	start: false,
};

const gameState = {
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
gameState.mainWall.setMainWall();

function Game() {
	ctx.clearRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
	++gameState.gameSpeed;

	// random enemy generation
	if (gameState.gameSpeed % 500 === 0) {
		const makeEnemy = prob25();
		if (makeEnemy) gameState.demons.push(generateDemon());
	}

	//check for demons for move and render
	updateEnemys(gameState.demons, gameState.gameSpeed, "demon");
	// move player down with gamespeed
	gameState.player.moveInY();

	//draw main wall
	gameState.mainWall.draw();

	if (gameState.gameSpeed % 300 === 0) {
		const makeEnemy = prob25();
		if (makeEnemy) gameState.spiders.push(generateSpider());
	}

	updateEnemys(gameState.spiders, gameState.gameSpeed, "spider");

	gameState.mainWallSpikes.forEach((spike) => {
		spike.moveInY();
		spike.draw();
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
				console.log("collision with spike");
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
	});

	// update walls and blades
	updateBlades(gameState.blades);
	updateWalls(gameState.walls);
	updateMainSpikes(gameState.mainWallSpikes);

	if (GameLoop.pause) return;

	requestAnimationFrame(Game);
}

function gameLoop() {
	//display and start game window
	startBtn.onclick = () => {
		mainMenu.style.display = "none";
		canvas.style.display = "block";
		setTimeout(()=>{
			GameLoop.start = true;
		}, 100);
		Game();
	};

	restartBtn.onclick = () => {
		restartMenu.style.display = "none";
		canvas.style.display = "block";
		setTimeout(()=>{
			GameLoop.start = true;
		})	
		Game();
	};

	document.addEventListener("click", () => {
		// jump only if game is not pause
		if (!GameLoop.pause && GameLoop.start) {
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
		if (event.key === " " && pause) {
			pause = false;
			Game();
		} else if (event.key === " ") pause = true;
	});
}

gameLoop();
