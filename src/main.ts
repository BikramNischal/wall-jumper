import { ctx } from "../modules/canvas.ts";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	INITX,
	INITY,
	MAIN_WALL_X,
	MAIN_WALL_Y,
} from "../utils/constants.ts";
import {
	generateWalls,
	generateBlades,
	updateWalls,
	updateBlades,
} from "./generateGameObjects.ts";
import Player from "../modules/player.ts";
import Wall from "../modules/wall.ts";

const gameWindow = document.querySelector(".game-window") as HTMLDivElement;

const player = new Player(
	INITX ,
	INITY,
	"./images/grab-left.png"
);

const gameState = {
	blades: generateBlades(2),
	mainWall: new Wall(MAIN_WALL_X,MAIN_WALL_Y,0,"./images/main-platform.png"),
	walls: generateWalls(4),
	player: player,
	airJump: false,
};


gameState.mainWall.setMainWall();


function Game() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);	

	gameState.player.moveInY();
	gameState.mainWall.draw();
	player.collisionWall(gameState.mainWall);
	if (player.jumpCount) player.draw();
	else player.drawJumpSprite();

	
	if (player.isJumping) {
		player.jump();
	}
	
	updateBlades(gameState.blades);
	updateWalls(gameState.walls);
	gameState.walls.forEach((wall) => {
		wall.moveInY();
		wall.draw();
		if(wall.spike){
			wall.spike.draw();
			if(player.isColliding(wall.spike)){
				console.log("spike collision");
			}
		}
		player.collisionWall(wall);
	});
	gameState.blades.forEach((blade) => {
		blade.moveInY();
		blade.draw();
		blade.oscillate()
	});

	requestAnimationFrame(Game);
}

gameWindow.addEventListener("click", () => {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	if (player.jumpCount > 0) {
		player.isJumping = true;
		player.resetJump();
		--player.jumpCount;
	}
	console.log(gameState.blades);
});


Game();
