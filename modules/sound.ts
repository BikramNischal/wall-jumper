
export default class Sound{
    sound : HTMLAudioElement;
    

    constructor(soundsrc: string){
        this.sound = new Audio();
        this.sound.src = soundsrc;
    }

    play(){
        this.sound.play();
    }

    stop(){
        this.sound.pause();
    }

}