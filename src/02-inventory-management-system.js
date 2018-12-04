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
        if(counters == count){
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

function solve(){
    const myInput = require("fs").readFileSync("data/02-inventory-management-system.txt").toString();
    const boxIds = myInput.split("\n");

    const part1 = checksum(boxIds);

    console.log("--- Day 2: Inventory Management System ---");
    console.log(`Puzzle answer : ${part1}`);
}

module.exports = {
    hasLetterOccurencies,
    twoOfAny,
    threeOfAny,
    checksum,
    solve
};