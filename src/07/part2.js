const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const {parse, dependencyMap, nextStep} = require("./part1");

function computeTime(step){
    return alphabet.split("").indexOf(step) + 1;
}

function computeSteps(dependencyMap, timeOffset, workersCount){
    let ticks = 0;

    let workers = new Map();

    while(dependencyMap.size !== 0){

        // if a worker is available
        while( workers.size < workersCount && nextStep(dependencyMap) !== undefined){
            let step = nextStep(dependencyMap);
            dependencyMap.delete(step);
            workers.set(step, computeTime(step) + timeOffset);
        }

        for(step of workers.keys()){
            let time = workers.get(step);
            time--;
            workers.set(step, time);

            if(time === 0){
                // step finished !
                workers.delete(step);
                for(value of dependencyMap.values()){
                    value.delete(step);
                }
            }

        }

        ticks++;
    }

    // finishing ongoing steps
    while(workers.size !== 0 ){

        for(step of workers.keys()){

            let time = workers.get(step);
            time--;
            workers.set(step, time);

            if(time === 0){
                // step finished !
                workers.delete(step);
            }
            ticks++;
        }
    }

    return ticks;
}



function solve(){
    const myInput = require("fs").readFileSync("src/07/input.txt").toString();

    const requirements = parse(myInput);
    let map = dependencyMap(requirements);
    return computeSteps(map, 60, 5);
}

module.exports = {
    computeTime,
    computeSteps,
    solve
};