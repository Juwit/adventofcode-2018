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
    const myInput = require("fs").readFileSync("src/02/input.txt").toString();
    const boxIds = myInput.split("\n");

    return lowestDistanceCommonLetters(boxIds);
}

module.exports = {
    distance,
    lowestDistance,
    lowestDistanceCommonLetters,
    solve
};