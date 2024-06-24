import Background from "../modules/background.ts";


const background1: Background = new Background(
	-700,
	0,
	"./images/background/sky1.png",
	"./images/background/rockBackground1.png",
	"./images/background/rock1.png",
	"./images/background/cloudbackground1.png",
	"./images/background/cloud1.png"

);

const  background2: Background = new Background(-700, 0, 
	"./images/background/sky2.png",
	"./images/background/rock2.png",
	"./images/background/ground1.png",
	"./images/background/ground2.png",
	"./images/background/cloud2.png"
);

const  background3: Background = new Background(-700,0, 
	"./images/background/sky3.png",
	"./images/background/rockbackground3.png",
	"./images/background/rock3.png",
	"./images/background/pines.png",
	"./images/background/cloud3.png"
);

function changeBackground(currentBackground:Background, nextBackground: Background){
    currentBackground.draw();
    currentBackground.moveInY(); 
    nextBackground.draw();
    nextBackground.moveInY();
}

export {background1,background2, background3, changeBackground};
