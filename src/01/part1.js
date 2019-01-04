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

function solve(){
    const myInput = require("fs").readFileSync("src/01/input.txt").toString();
    const frequencies = myInput.split("\n");

    return computeFrequency(frequencies);
}

module.exports = {
    computeFrequency,
    solve,
    title: "--- Day 1: Chronal Calibration ---"
};