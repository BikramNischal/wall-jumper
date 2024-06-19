import { ctx } from "../modules/canvas.ts";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	WALL_HEIGHT_SMALL,
	INITX,
	INITY,
	WALL_WIDTH
} from "../utils/constants.ts";
import {
	generateWalls,
	generateBlades,
	updateWalls,
	updateBlades,
} from "./generateGameObjects.ts";
import Player from "../modules/player.ts";

const gameWindow = document.querySelector(".game-window") as HTMLDivElement;

const player = new Player(
	INITX + WALL_WIDTH,
	INITY + WALL_HEIGHT_SMALL / 2,
	"./images/grab-left.png"
);

const gameState = {
	blades: generateBlades(4),
	walls: generateWalls(4),
	player: new Player(
		INITX + WALL_WIDTH,
		INITY + WALL_HEIGHT_SMALL / 2,
		"./images/grab-left.png"
	),
	airJump: false,
};

// let walls: Wall[] = generateWalls(4);
// const blades: Blade[] = generateBlades(random(4));

function Game() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	if(player.jumpCount)
		player.draw();
	else 
		player.drawJumpSprite();

	if (player.isJumping) player.jump();
	gameState.walls.forEach((wall) => {
		wall.draw();
		player.collision(wall);
	});
	// gameState.blades.forEach((blade) => {
	// 	blade.draw();
	// 	blade.oscillate()
	// });

	requestAnimationFrame(Game);
}

gameWindow.addEventListener("click", () => {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	updateWalls(gameState.walls);
	updateBlades(gameState.blades);

	if (player.jumpCount > 0) {
		player.isJumping = true;
		player.resetJump();
		--player.jumpCount;
	}
});

Game();
