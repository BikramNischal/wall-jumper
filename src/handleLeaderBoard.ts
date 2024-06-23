import { Score } from "../utils/constants";

export function getLeaderBoard() {
	let leaderBoard: Score[];
	const leaderBoardString = localStorage.getItem("walljumper");
	if (!leaderBoardString) {
		leaderBoard = [];
	} else {
		leaderBoard = JSON.parse(leaderBoardString as string);
	}
    return leaderBoard;
}

export function updateLeaderBoard(leaderBoard: Score[]){
    localStorage.setItem("walljumper", JSON.stringify(leaderBoard));
}


// check if user name exists on leaderboard
// if users exists and user has new hightscore update score 
// if user namde doesn't exists new entry on leaderboard
export function updateScore(user: Score, leaderBoard: Score[]){
	let userNameExists : boolean = false;
	leaderBoard.forEach((record) => {
		if(record.name === user.name){
			if(record.value < user.value) record.value = user.value;
			userNameExists = true;
		}
	});		

	if(!userNameExists){
		leaderBoard.push(user);
	}	
}



