import { canvas } from "../modules/canvas";
import { GameLoop, GameState, Score } from "../utils/constants";
import {getLeaderBoard, updateLeaderBoard, updateScore} from "./handleLeaderBoard.ts";

//game menu references
const mainMenu = document.querySelector(".start-menu") as HTMLDivElement;
const restartMenu = document.querySelector(".restart-menu") as HTMLDivElement;
const pauseWindow = document.querySelector(".pause-window") as HTMLDivElement;

const score = document.querySelector(".score") as HTMLParagraphElement;
const leaderBoardTable = document.querySelector(".leaderboard") as HTMLDivElement;

export function createLeaderBoardEntry(leaderBoard:Score[]){
	leaderBoardTable.innerHTML = "";
	for(const player of leaderBoard){
		// create score display elements 
		const leaderBoardRow = document.createElement("p");
		const playerName = document.createElement("span");
		const score = document.createElement("span");

		// give class name for styling 
		leaderBoardRow.classList.add("leaderboard-row");
		playerName.classList.add("leaderboard-entry");
		score.classList.add("leaderboard-entry");

		//assign display value i.e user name and score
		playerName.innerHTML = player.name;
		score.innerHTML = player.value.toString();

		// add elements to DOM
		leaderBoardRow.appendChild(playerName);
		leaderBoardRow.appendChild(score);
		leaderBoardTable.appendChild(leaderBoardRow);
	}
}

export function displayGame(gameStatus: GameLoop) {
	mainMenu.style.display = "none";
	restartMenu.style.display = "none";
	canvas.style.display = "block";
	const clickguard = setTimeout(() => {
		gameStatus.clickState = true;
        clearTimeout(clickguard);
	}, 10);
}

export function displayRestartMenu(gameStatus:GameLoop, gameState: GameState) {
	
	const leaderBoard = getLeaderBoard();
	const newScore = {
		name: gameState.userName,
		value: gameState.score
	}
	updateScore(newScore, leaderBoard);
	leaderBoard.sort((firstScore, secondScore)=> secondScore.value - firstScore.value);

	updateLeaderBoard(leaderBoard);	
	createLeaderBoardEntry(leaderBoard);


	restartMenu.style.display = "flex";
	score.innerHTML = `${gameState.userName} : ${gameState.score}`;
	canvas.style.display = "none";
	const clickguard = setTimeout(() => {
		gameStatus.clickState = true;
        clearTimeout(clickguard);
	}, 10);
}


export function displayPause(){
	pauseWindow.style.display= "flex";
}

export function hidePause(){
	pauseWindow.style.display = "none";
}

