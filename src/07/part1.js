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

function solve(){
    const myInput = require("fs").readFileSync("src/07/input.txt").toString();

    const requirements = parse(myInput);
    let map = dependencyMap(requirements);
    return order(map);
}

module.exports = {
    parse,
    dependencyMap,
    nextStep,
    order,
    solve,
    title: "--- Day 7: The Sum of Its Parts ---"
};