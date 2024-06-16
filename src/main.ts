import { ctx } from "../modules/canvas.ts";
import Wall, {
	generateWalls,
	calcx,
	randomWallHeight,
} from "../modules/wall.ts";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	WALL_Y_GAP,
} from "../utils/constants.ts";



const gameWindow = document.querySelector(".game-window") as HTMLDivElement;
const walls = generateWalls(4);

walls.forEach((wall) => wall.draw());
console.log(walls);

gameWindow.addEventListener("click", () => {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	// condition checks if the gap between top most wall and the starting-y of canvas
	// is greater than wall gap in y-axis
	// if true then new wall is created and add to the list
	if (walls[walls.length - 1].y > WALL_Y_GAP) {
		//this calcuates the y-position of new wall
		const newWallHeight = randomWallHeight();
		const newWallY = walls[walls.length - 1].y - WALL_Y_GAP - newWallHeight;
		const newWall = new Wall(
			calcx(),
			newWallY,
			"normal",
			"./images/normal-wall.png"
		);
		newWall.h = newWallHeight;
		walls.push(newWall);
	}

	walls.forEach((wall) => {
		wall.y += 10;
		wall.draw();
		if (wall.y > CANVAS_HEIGHT) {
			//remove the wall(i.e first wall in the list) that goes out of canvas
			walls.shift();

			//first wall in the array is removed and second wall becomes the first wall
			//which causes the new first wall disappear as first wall
			//(i.e wall that is already removed from the list) is already displayed
			//but new first is not displayed yet so to make the new wall appear again
			// re-draw the new first wall i.e wall at near bottom of canvas
			if (walls[0]) {
				walls[0].y += 10;
				walls[0].draw();
			}
			console.log(walls);
		}
	});
});
