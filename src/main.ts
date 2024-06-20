import { ctx } from "../modules/canvas.ts";
import {
	CANVAS_SIZE,
	ENEMY_SIZE,
	INITX,
	INITY,
	MAIN_WALL,
} from "../utils/constants.ts";
import {
	generateWalls,
	generateBlades,
	updateWalls,
	updateBlades,
	generateEnemy,
	generateEnemys,
} from "./generateGameObjects.ts";
import Player from "../modules/player.ts";
import Wall from "../modules/wall.ts";
import Enemy from "../modules/enemy.ts";
import { prob25 } from "../utils/random.ts";

const player = new Player(INITX, INITY, "./images/grab-left.png");

const gameState = {
	blades: generateBlades(2),
	mainWall: new Wall(
		MAIN_WALL.x,
		MAIN_WALL.y,
		0,
		"./images/main-platform.png"
	),
	walls: generateWalls(4),
	player: player,
	gameSpeed: 0,
	enemys: generateEnemys(),
};

let enemy = new Enemy(200, 200, "./images/demon.png", 79, 69, 4);
let pause = false;

gameState.mainWall.setMainWall();

function Game() {
	ctx.clearRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
	++gameState.gameSpeed;

	// random enemy generation
	if (gameState.gameSpeed % 100 === 0) {
		const makeEnemy = prob25();
		if (makeEnemy) gameState.enemys.push(generateEnemy());
	}

	if (gameState.enemys.length) {
		if (gameState.enemys[0].y > CANVAS_SIZE.height)
			gameState.enemys.shift();
		gameState.enemys.forEach((enemy) => {
			enemy.moveInX();
			enemy.moveInY();
			enemy.draw(gameState.gameSpeed);
		});
	}

	gameState.player.moveInY();
	gameState.mainWall.draw();

	gameState.player.collisionWall(gameState.mainWall);
	if (gameState.player.jumpCount) gameState.player.draw();
	else gameState.player.drawJumpSprite();

	if (player.isJumping) {
		player.jump();
	}

	updateBlades(gameState.blades);
	updateWalls(gameState.walls);
	gameState.walls.forEach((wall) => {
		wall.moveInY();
		wall.draw();
		if (wall.spike) {
			wall.spike.draw();
			console.log(wall.h, wall.y, wall.spike.y);
			if (gameState.player.isColliding(wall.spike)) {
				console.log("collision with spike");
			}
		}
		player.collisionWall(wall);
	});
	gameState.blades.forEach((blade) => {
		blade.moveInY();
		blade.draw();
		blade.oscillate();
	});

	if (pause) return;

	requestAnimationFrame(Game);
}

document.addEventListener("click", () => {
	// jump only if game is not pause
	if (!pause) {
		ctx.clearRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
		if (player.jumpCount > 0) {
			player.isJumping = true;
			player.resetJump();
			--player.jumpCount;
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

Game();
