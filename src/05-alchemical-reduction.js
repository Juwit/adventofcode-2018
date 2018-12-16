
function reacting(unitA, unitB){
    return unitA.toUpperCase() === unitB.toUpperCase() && unitA !== unitB;
}

function reduce(polymer){
    // adding a blank char
    const input = polymer.concat(" ");
    let output = "";
    for(let i = 0; i < input.length - 1; i++){
        if( reacting(input[i], input[i+1]) ){
            i++; // skipping these chars
        }
        else {
            output = output.concat(input[i]); // keeping this car
        }
    }
    return output;
}

function triggerFullReduction(polymer){
    while(true) {
        let reducedPolymer = reduce(polymer);
        if( reducedPolymer === polymer ){
            return polymer;
        }
        polymer = reducedPolymer;
    }
}

function removeUnits(type, polymer){
    return polymer
        .replace(new RegExp(type, "g"), "")
        .replace(new RegExp(type.toUpperCase(), "g"), "")
}

function optimizePolymer(polymer){
    // find all units
    const unitsSet = new Set();
    polymer.split("").forEach(unit => unitsSet.add(unit.toLowerCase()));

    const units = Array.from(unitsSet);

    const reducedPolymersSizes = units
        .map(unit => removeUnits(unit, polymer))
        .map(polymer => triggerFullReduction(polymer))
        .map(polymer => parseInt(polymer.length))
        .sort((a,b) => a-b);

    return reducedPolymersSizes[0];
}

function solve(){
    const myInput = require("fs").readFileSync("data/05-alchemical-reduction.txt").toString();

    const part1 = triggerFullReduction(myInput);
    const part2 = optimizePolymer(myInput);

    console.log("--- Day 5: Alchemical Reduction ---");
    console.log(`Puzzle answer : ${part1.length}`);
    console.log("--- Part Two ---");
    console.log(`Puzzle answer : ${part2}`);
    console.log();
}

module.exports = {
    reacting,
    triggerFullReduction,
    reduce,
    removeUnits,
    optimizePolymer,
    solve
};