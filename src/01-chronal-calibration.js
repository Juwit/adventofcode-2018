const functions = {
    "+" : (a,b) => a+b,
    "-" : (a,b) => a-b
};

function computeFrequency(frequencies){
    let result = 0;

    frequencies.forEach(freq => {
       let operator = functions[freq.charAt(0)];
       let operand = parseInt( freq.substr(1) );
       result = operator(result, operand);
    });

    return result;
}

function computeFrequencyUntilRepetition(frequencies){
    let result = 0;

    const alreadySeenFrequencies = new Set();
    alreadySeenFrequencies.add(result);

    for(let i = 0; ; i++) {
        let freq = frequencies[i % frequencies.length];
        let operator = functions[freq.charAt(0)];
        let operand = parseInt( freq.substr(1) );
        result = operator(result, operand);
        if (alreadySeenFrequencies.has(result)){
            return result;
        }

        alreadySeenFrequencies.add(result);
    }
}

function solve(){
    const myInput = require("fs").readFileSync("data/01-chronal-calibration.txt").toString();
    const frequencies = myInput.split("\n");

    const part1 = computeFrequency(frequencies);
    const part2 = computeFrequencyUntilRepetition(frequencies)

    console.log("--- Day 1: Chronal Calibration ---");
    console.log(`Puzzle answer : ${part1}`);
    console.log("--- Part Two ---");
    console.log(`Puzzle answer : ${part2}`);
    console.log();
}

module.exports = {
    computeFrequency,
    computeFrequencyUntilRepetition,
    solve
};