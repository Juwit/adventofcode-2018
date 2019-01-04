const requirementRegex = /Step (\w) must be finished before step (\w) can begin./;

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function parse(input){
    return input.split("\n")
        .map(requirement => {
           const [_, from, to] = requirementRegex.exec(requirement);
           return {from, to};
        })

}
function dependencyMap(requirements){
    const map = new Map();
    requirements.forEach(({from, to}) => {
        if(! map.has(from)){
            map.set(from, new Set());
        }
        if(! map.has(to) ){
            map.set(to, new Set());
        }
        map.get(to).add(from);
    });
    return map;

}
function nextStep(dependencyMap){
    return alphabet.split("").find(char => {
        const dependencies = dependencyMap.get(char);
        return dependencies && dependencies.size === 0;
    });
}

function order(dependencyMap){
    let result = "";
    while(dependencyMap.size !== 0){
        let step = nextStep(dependencyMap);
        result = result.concat(step);

        dependencyMap.delete(step);
        for(value of dependencyMap.values()){
            value.delete(step);
        }
    }
    return result;
}

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
    const part1 = order(map);
    map = dependencyMap(requirements);
    const part2 = computeSteps(map, 60, 5);

    console.log("--- Day 7: The Sum of Its Parts ---");
    console.log(`Puzzle answer : ${part1}`);
    console.log("--- Part Two ---");
    console.log(`Puzzle answer : ${part2}`);
    console.log();
}

module.exports = {
    parse,
    dependencyMap,
    nextStep,
    order,
    computeTime,
    computeSteps,
    solve
};