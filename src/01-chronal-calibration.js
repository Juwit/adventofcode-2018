function computeFrequency(frequencies){
    let result = 0;


    const functions = {
        "+" : (a,b) => a+b,
        "-" : (a,b) => a-b
    };

    frequencies.forEach(freq => {
       let operator = functions[freq.charAt(0)];
       let operand = parseInt( freq.substr(1) );
       result = operator(result, operand);
    });

    return result;
}

function solve(){
    let myInput = require("fs").readFileSync("data/01-chronal-calibration.txt").toString();

    const part1 = computeFrequency(myInput.split("\n"));

    console.log("--- Day 1: Chronal Calibration ---");
    console.log(`Puzzle answer : ${part1}`);
    console.log();
}

module.exports = {
    computeFrequency,
    solve
};