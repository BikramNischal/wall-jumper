import { ctx } from "../modules/canvas.ts";
import {
	CANVAS_SIZE,
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
	generateMainSpikes,
	updateMainSpikes,
} from "./generateGameObjects.ts";
import Player from "../modules/player.ts";
import Wall from "../modules/wall.ts";
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
	mainWallSpikes: generateMainSpikes(),
};

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

	//check for enemy render and move enemy
	if (gameState.enemys.length) {
		if (gameState.enemys[0].y > CANVAS_SIZE.height)
			gameState.enemys.shift();
		gameState.enemys.forEach((enemy) => {
			enemy.moveInX();
			enemy.moveInY();
			enemy.draw(gameState.gameSpeed);
		});
	}

	// move player down with gamespeed
	gameState.player.moveInY();

	//draw main wall
	gameState.mainWall.draw();
	gameState.mainWallSpikes.forEach((spike)=>{
		spike.moveInY();
		spike.draw();	
	});

	// check for collision in the main wall
	gameState.player.collisionWall(gameState.mainWall);
	if (gameState.player.jumpCount) gameState.player.draw();
	else gameState.player.drawJumpSprite();

	if (player.isJumping) {
		player.jump();
	}


	//move walls  and spikes  down and check for collision
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
