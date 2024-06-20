

// returns a random number between 0 to max 
export default function random(max: number){
    return Math.floor(Math.random() * max);
}


// return a random number between a range (min-max)
export function randomRange(min:number, max:number){
    return Math.floor(Math.random() * (max-min) + min);
}

// return true or false accodring to the 25% probability
export function prob25(){
    const randomConst = random(100);
    if(randomConst < 100/2 && randomConst%2 === 0) return true;
    return false;
}

// return true or false with 50% probability
export function prob50(){
    const randomConst = random(100);
    return ( randomConst < 50) ? true : false;
}
