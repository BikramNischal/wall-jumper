
const gameWindow = document.querySelector(".game-window") as HTMLDivElement;
const canvas = document.querySelector(".canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

// get client size of game window element 
const gameWindowSize = gameWindow.getBoundingClientRect();

// set canvas height and width accoring to game window client height and width
canvas.height = gameWindowSize.height;
canvas.width = gameWindowSize.width;

export {canvas, ctx};