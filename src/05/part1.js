
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

function solve(){
    const myInput = require("fs").readFileSync("src/05/input.txt").toString();

    return triggerFullReduction(myInput).length;
}

module.exports = {
    reacting,
    triggerFullReduction,
    reduce,
    solve,
    title: "--- Day 5: Alchemical Reduction ---"
};