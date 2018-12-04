function hasLetterOccurencies(count, word){
    const counter = new Map();
    word.split("").forEach(char => {
        if( counter.has(char) ){
            counter.set(char, counter.get(char) + 1);
        }
        else {
            counter.set(char, 1);
        }
    });
    for(let counters of counter.values()){
        if(counters === count){
            return true;
        }
    }
    return false;
}

function twoOfAny(words){
    return words.filter(word => hasLetterOccurencies(2, word)).length;
}

function threeOfAny(words){
    return words.filter(word => hasLetterOccurencies(3, word)).length;
}

function checksum(boxIds) {
    return twoOfAny(boxIds) * threeOfAny(boxIds);
}

function distance(boxIdA, boxIdB){
    let distance = 0;
    for(let i = 0; i < boxIdA.length; i++){
        if(boxIdA[i] !== boxIdB[i]){
            distance++;
        }
    }
    return distance;
}

function lowestDistance(boxIds){
    let resultDistance = boxIds[0].length;
    let result = {};
    boxIds.forEach(a => {
        boxIds.forEach(b => {
            if(a === b){
                return;
            }
            let computedDistance = distance(a,b);
            if(computedDistance < resultDistance){
                result.a = a;
                result.b = b;
                resultDistance = computedDistance;
            }
        });
    });
    return result;
}

function lowestDistanceCommonLetters(boxIds){
    let lowestDistanceIds = lowestDistance(boxIds);
    let boxIdA = lowestDistanceIds.a;
    let boxIdB = lowestDistanceIds.b;
    let commonLetters = "";
    for(let i = 0; i < boxIdA.length; i++){
        if(boxIdA[i] === boxIdB[i]){
            commonLetters = commonLetters.concat(boxIdA[i]);
        }
    }
    return commonLetters;
}

function solve(){
    const myInput = require("fs").readFileSync("data/02-inventory-management-system.txt").toString();
    const boxIds = myInput.split("\n");

    const part1 = checksum(boxIds);
    const part2= lowestDistanceCommonLetters(boxIds);

    console.log("--- Day 2: Inventory Management System ---");
    console.log(`Puzzle answer : ${part1}`);
    console.log("--- Part Two ---");
    console.log(`Puzzle answer : ${part2}`);
    console.log();
}

module.exports = {
    hasLetterOccurencies,
    twoOfAny,
    threeOfAny,
    checksum,
    distance,
    lowestDistance,
    lowestDistanceCommonLetters,
    solve
};