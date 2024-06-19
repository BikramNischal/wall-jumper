import Player from "../modules/player.ts";
import Wall from "../modules/wall.ts";

export function normalCollision(player: Player, wall: Wall) {
	// Adjust player position based on collision side
	const dx = player.x + player.w / 2 - (wall.x + wall.w / 2);
	const dy = player.y + player.h / 2 - (wall.y + wall.h / 2);
	const width = (player.w + wall.w) / 2;
	const height = (player.h + wall.h) / 2;
	const crossWidth = width * dy;
	const crossHeight = height * dx;

	if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
		if (crossWidth > crossHeight) {
			if (crossWidth > -crossHeight) {
				// Collision on the bottom side
				player.y = wall.y + wall.h - player.h / 2;
				if (player.x < wall.x) player.x = wall.x - player.w;
				else player.x = wall.x + wall.w;
			} else {
				// Collision on the left side
				player.x = wall.x - player.w;
				player.xDirection = -1;
				player.img.src = "./images/grab-right.png";
			}
		} else {
			if (crossWidth > -crossHeight) {
				// Collision on the right side
				player.x = wall.x + wall.w;
				player.xDirection = 1;
				player.img.src = "./images/grab-left.png";
			} else {
				// Collision on the top side
				player.y = wall.y;
				if (player.x < wall.x) player.x = wall.x - player.w;
				else player.x = wall.x + wall.w;
			}
		}
	}
}

export function rubberCollision(player:Player){
    player.isJumping = true;
    // player.resetJump();
    player.jump();
    player.isJumping = false;

}
