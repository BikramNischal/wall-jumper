

// returns a random number between 0 to max 
export default function random(max: number){
    return Math.floor(Math.random() * max);
}

// return true or false accodring to the probability
export function probabilty(max:number){
    const randomConst = random(max);
    if(randomConst > max/2 && randomConst%2 === 0) return true;
    return false;
}

// return true or false with 50% probability
export function prob50(){
    const randomConst = random(100);
    return ( randomConst < 50) ? true : false;
}