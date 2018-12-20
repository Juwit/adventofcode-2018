const requirementRegex = /Step (\w) must be finished before step (\w) can begin./;

function parse(input){
    return input.split("\n")
        .map(requirement => {
           const [_, from, to] = requirementRegex.exec(requirement);
           return {from, to};
        })
}

function dependencyMap(requirements){
    const map = new Map();
    // init the map
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
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return chars.split("").find(char => {
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


function solve(){
    const myInput = require("fs").readFileSync("data/07-the-sum-of-its-parts.txt").toString();

    const requirements = parse(myInput);
    const map = dependencyMap(requirements);
    const part1 = order(map);

    console.log("--- Day 7: The Sum of Its Parts ---");
    console.log(`Puzzle answer : ${part1}`);
    console.log();
}

module.exports = {
    parse,
    dependencyMap,
    nextStep,
    order,
    solve
};