import { ctx } from "../modules/canvas.ts";
import {
	CANVAS_SIZE,
	GameState,
	INITX,
	INITY,
	MAIN_WALL,
	GameLoop,
	GAME_MOVEMENT,
} from "../utils/constants.ts";
import {
	generateWalls,
	generateBlades,
	generateDemons,
	generateMainSpikes,
	generateDemon,
	generateSpider,
	generateSpiders,
	displayScore,
} from "./generateGameObjects.ts";

import {
	updateWalls,
	updateBlades,
	updateSider,
	updateMainSpikes,
	updateDemons,
} from "./updateGameObjects.ts";

import { displayGame, displayPause, displayRestartMenu, hidePause } from "./handleWindow.ts";

import Player from "../modules/player.ts";
import Wall from "../modules/wall.ts";
import { prob25 } from "../utils/random.ts";

// Game Menu and Game Window  references
const startBtn = document.querySelector(".btn--start") as HTMLButtonElement;
const restartBtn = document.querySelector(".btn--restart") as HTMLButtonElement;
const userName = document.querySelector(".user-name") as HTMLInputElement;

let playerName : string ;
userName.onchange = () =>{
	playerName = userName.value;
};

const gameStatus: GameLoop = {
	pause: false,
	clickState: false,
	restart: false,
	gameMovement: GAME_MOVEMENT
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
		walls: generateWalls(3),
		player: new Player(INITX, INITY, "./images/grab-left.png"),
		gameSpeed: 0,
		demons: generateDemons(),
		spiders: generateSpiders(),
		mainWallSpikes: generateMainSpikes(),
		score: 0,
		userName: "Unknown",
	};
};


let gameState: GameState = generateGameState();

function Game(gameState: GameState) {
	ctx.clearRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);

	displayScore(gameState.score);
	++gameState.gameSpeed;
	gameStatus.gameMovement = GAME_MOVEMENT + (gameState.score/10)*0.5;

	//draw main(left most) wall
	gameState.mainWall.draw();

	// random demon generation according to game speed
	if (gameState.gameSpeed % 500 === 0) {
		const makeEnemy = prob25();
		if (makeEnemy) gameState.demons.push(generateDemon());
	}

	// update demons list and demon position 
	updateDemons(gameState.demons, gameState,gameStatus.gameMovement);

	for (let i = 0; i < gameState.demons.length && !gameStatus.restart; ++i) {
		const demon = gameState.demons[i];
		demon.draw(gameState.gameSpeed);
		//on collision update gameStatus and display restart window and exit game window
		if (gameState.player.isColliding(demon)) {
			gameStatus.restart = true;
			demon.collisionSound.play();
			displayRestartMenu(gameStatus, gameState);
			return;
		}
	}

	// generate spiders according to game speed
	if (gameState.gameSpeed % 300 === 0) {
		const makeEnemy = prob25();
		if (makeEnemy) gameState.spiders.push(generateSpider());
	}

	
	// update spider list and move them along game
	updateSider(gameState.spiders, gameState,gameStatus.gameMovement);

	// collision detection for spiders
	for (let i = 0; i < gameState.spiders.length && !gameStatus.restart; ++i) {
		const spider = gameState.spiders[i];
		spider.draw(gameState.gameSpeed);
		//on collision update gameStatus and display restart window and exit game window
		if (gameState.player.isColliding(spider)) {
			gameStatus.restart = true;
			spider.collisionSound.play();
			displayRestartMenu(gameStatus,gameState);
			return;
		}
	}

	// collision detection for spikes on the left wall
	for(let i =0; i< gameState.mainWallSpikes.length && !gameStatus.restart; ++i){
		const spike = gameState.mainWallSpikes[i];
		spike.moveInY(gameStatus.gameMovement);
		spike.draw();
		//on collision update gameStatus and display restart window and exit game window
		if(gameState.player.isColliding(spike)){
			gameStatus.restart = true;
			spike.collisionSound.play();
			displayRestartMenu(gameStatus,gameState);
			return;
		}
	}

	//Player  movement and rendering
	// move player down with gamespeed
	gameState.player.moveInY(gameStatus.gameMovement);
	if(gameState.player.y > CANVAS_SIZE.height){
		gameStatus.restart = true;
		gameState.player.fallSound.play();
		displayRestartMenu(gameStatus, gameState);
		return;
	}

	// check for collision in the main wall
	gameState.player.collisionWall(gameState.mainWall);

	// rander player image and jumping sprite
	if (gameState.player.jumpCount) {
		gameState.player.draw();
	} else gameState.player.drawJumpSprite(gameState.gameSpeed);

	// make player jump
	if (gameState.player.isJumping) {
		gameState.player.jump();
	}

	// update wall position and check collision
	for(let i =0; i < gameState.walls.length && !gameStatus.restart; ++i){
		const wall = gameState.walls[i];
		wall.moveInY(gameStatus.gameMovement);
		wall.draw();

		if(wall.effect && !wall.effectUsed){
			wall.effect.draw();
			gameStatus.clickState = false;
			const effectDuration = setTimeout(()=>{
				wall.effect= null;
				wall.effectUsed = true;
				gameStatus.clickState = true;
				clearTimeout(effectDuration);
			}, 2000)
		}

		if(wall.spike){
			wall.spike.draw();
			//on collision update gameStatus and display restart window and exit game window
			if(gameState.player.isColliding(wall.spike)){
				gameStatus.restart = true;
				wall.spike.collisionSound.play();
				displayRestartMenu(gameStatus,gameState);
				return;
			}
		}
		gameState.player.collisionWall(wall);
	}


	//move blades down and check collision
	for(let i = 0; i< gameState.blades.length; ++i){
		const blade = gameState.blades[i];
		blade.moveInY(gameStatus.gameMovement);
		blade.draw();
		blade.oscillate();

		//on collision update gameStatus and display restart window and exit game window
		if(gameState.player.isColliding(blade)){
			gameStatus.restart = true;
			blade.collisionSound.play();
			displayRestartMenu(gameStatus, gameState);
			return;
		}
	}

	// update walls, blades and spikes
	updateBlades(gameState.blades,gameState);
	updateWalls(gameState.walls,gameState);
	updateMainSpikes(gameState.mainWallSpikes, gameState);

	if (gameStatus.pause) return;

	requestAnimationFrame(() => Game(gameState));
}

function gameLoop() {	
	
	//display and start game window
	startBtn.onclick = () => {
		if(playerName)
			gameState.userName = playerName;
		gameStatus.clickState = false;
		displayGame(gameStatus);
		gameState.mainWall.setMainWall();
		Game(gameState);
	};


	restartBtn.onclick = () => {
		gameStatus.clickState = false;
		gameStatus.restart = false;
		gameStatus.gameMovement = GAME_MOVEMENT;
		displayGame(gameStatus);

		gameState = generateGameState();

		if(playerName)
			gameState.userName = playerName;
		gameState.mainWall.setMainWall();

		Game(gameState);
	};

	document.addEventListener("click", () => {
		// jump only if game is not pause
		if (!gameStatus.pause && gameStatus.clickState) {
			ctx.clearRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
			if (gameState.player.jumpCount > 0) {
				gameState.player.isJumping = true;
				if(gameState.player.jumpCount === 2){
					gameState.player.jumpSound.play();
				} else {
					gameState.player.airJumpSound.play();
				}
				gameState.player.resetJump();
				--gameState.player.jumpCount;
			}
		}
	});

	document.addEventListener("keydown", (event) => {
		//pause game on SPACE press
		if (event.key === " " && gameStatus.pause) {
			gameStatus.pause = false;
			hidePause();
			Game(gameState);
		} else if (event.key === " " && !gameStatus.restart){
			gameStatus.pause = true;
			displayPause();
		}
	});

}

gameLoop();
