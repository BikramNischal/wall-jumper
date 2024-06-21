import { canvas } from "../modules/canvas";
import { GameLoop } from "../utils/constants";

//game menu references
const mainMenu = document.querySelector(".start-menu") as HTMLDivElement;
const restartMenu = document.querySelector(".restart-menu") as HTMLDivElement;

export function displayGame(gameloop: GameLoop) {
	mainMenu.style.display = "none";
	restartMenu.style.display = "none";
	canvas.style.display = "block";
	const clickguard = setTimeout(() => {
		gameloop.start = true;
        clearInterval(clickguard);
	}, 100);
}

export function displayRestartMenu(gameloop:GameLoop) {
	restartMenu.style.display = "flex";
	canvas.style.display = "none";
	const clickguard = setTimeout(() => {
		gameloop.start = true;
        clearInterval(clickguard);
	}, 100);
}
