import { canvas } from "../modules/canvas";
import { GameLoop, GameState, LeaderBoard } from "../utils/constants";
import {getLeaderBoard, updateLeaderBoard} from "./handleLeaderBoard.ts";

//game menu references
const mainMenu = document.querySelector(".start-menu") as HTMLDivElement;
const restartMenu = document.querySelector(".restart-menu") as HTMLDivElement;
const score = document.querySelector(".score") as HTMLParagraphElement;
const leaderBoardTable = document.querySelector(".leaderboard") as HTMLDivElement;

export function createLeaderBoardEntry(leaderBoard:LeaderBoard){
	leaderBoardTable.innerHTML = "";
	for(const player in leaderBoard){
		// create score display elements 
		const leaderBoardRow = document.createElement("p");
		const playerName = document.createElement("span");
		const score = document.createElement("span");

		// give class name for styling 
		leaderBoardRow.classList.add("leaderboard-row");
		playerName.classList.add("leaderboard-entry");
		score.classList.add("leaderboard-entry");

		//assign display value i.e user name and score
		playerName.innerHTML = player;
		score.innerHTML = leaderBoard[player].toString();

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

	// update leader board 
	let leaderBoard: LeaderBoard = getLeaderBoard();
	if(leaderBoard[gameState.userName] && leaderBoard[gameState.userName] < gameState.score){
		leaderBoard[gameState.userName]	 = gameState.score;
	} else if(leaderBoard[gameState.userName]){
		console.log("You didn't bit you high score");
	} else{
		leaderBoard[gameState.userName] = gameState.score;
	}	
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

