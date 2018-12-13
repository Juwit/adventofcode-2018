
function reacting(unitA, unitB){
    return unitA.toUpperCase() === unitB.toUpperCase() && unitA !== unitB;
}

function reduce(polymer){
    // adding a blank char
    const input = polymer.concat(" ");
    let output = "";
    for(let i = 0; i < input.length - 1; ){
        if( reacting(input[i], input[i+1]) ){
            i += 2; // skipping these chars
        }
        else {
            output = output.concat(input[i]); // keeping this car
            i++;
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

function solve(){
    const myInput = require("fs").readFileSync("data/05-alchemical-reduction.txt").toString();

    const part1 = triggerFullReduction(myInput);

    console.log("--- Day 5: Alchemical Reduction ---");
    console.log(`Puzzle answer : ${part1.length}`);
    console.log();
}

module.exports = {
    reacting,
    triggerFullReduction,
    reduce,
    solve
};