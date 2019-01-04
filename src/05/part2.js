const {triggerFullReduction} = require("./part1");

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
    const myInput = require("fs").readFileSync("src/05/input.txt").toString();

    return optimizePolymer(myInput);
}

module.exports = {
    removeUnits,
    optimizePolymer,
    solve
};