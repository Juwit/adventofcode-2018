const functions = {
    "+" : (a,b) => a+b,
    "-" : (a,b) => a-b
};

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
    const myInput = require("fs").readFileSync("src/01/input.txt").toString();
    const frequencies = myInput.split("\n");

    return computeFrequencyUntilRepetition(frequencies)
}

module.exports = {
    computeFrequencyUntilRepetition,
    solve
};