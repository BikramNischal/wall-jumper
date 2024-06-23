import { LeaderBoard } from "../utils/constants";

export function getLeaderBoard() {
	let leaderBoard: LeaderBoard;
	const leaderBoardString = localStorage.getItem("walljumper");

	if (!leaderBoardString) {
		leaderBoard = {};
	} else {
		leaderBoard = JSON.parse(leaderBoardString as string);
	}
    return leaderBoard;
}

export function updateLeaderBoard(leaderBoard: LeaderBoard){
    localStorage.setItem("walljumper", JSON.stringify(leaderBoard));
}

