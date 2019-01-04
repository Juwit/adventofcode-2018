const claimRegex = /#(\d*) @ (\d*),(\d*): (\d*)x(\d*)/;

function parseClaim(claim){
    let [_, id, left, top, width, height] = claimRegex.exec(claim);
    return {
        id : parseInt(id),
        position: {
            left: parseInt(left),
            top: parseInt(top)
        },
        size: {
            width: parseInt(width),
            height: parseInt(height)
        },
        overlaps: false
    }
}

function computeOverlapping(claims){

    let fabric = [];
    for(let i = 0; i < 1000; i++){
        fabric[i] = [];
        for(let j = 0; j < 1000; j++){
            fabric[i][j] = 0;
        }
    }

    claims
        .map(parseClaim)
        .forEach( claim => claimFabric(fabric, claim) );

    let count = 0;
    for(let i = 0; i < 1000; i++){
        for(let j = 0; j < 1000; j++){
            if(fabric[i][j] > 1){
                count++;
            }
        }
    }

    return count;

}

function claimFabric(fabric, claim){
    for(let i = claim.position.left; i < claim.position.left + claim.size.width; i++){
        for(let j = claim.position.top; j < claim.position.top + claim.size.height; j++) {
            fabric[i][j]++;
        }
    }
}

function overlaps(claimA, claimB){
    // find if the two rectangles overlap?!
    let rectangleA = {
        pointA: {
            x: claimA.position.left,
            y: claimA.position.top
        },
        pointB: {
            x: claimA.position.left + claimA.size.width - 1,
            y: claimA.position.top + claimA.size.height - 1
        }
    };
    let rectangleB = {
        pointA: {
            x: claimB.position.left,
            y: claimB.position.top
        },
        pointB: {
            x: claimB.position.left + claimB.size.width - 1,
            y: claimB.position.top + claimB.size.height - 1
        }
    };
    if(rectangleB.pointA.x > rectangleA.pointB.x){
        return false;
    }
    if(rectangleB.pointA.y > rectangleA.pointB.y){
        return false;
    }
    if(rectangleB.pointB.x < rectangleA.pointA.x){
        return false;
    }
    if(rectangleB.pointB.y < rectangleA.pointA.y){
        return false;
    }
    return true;
}

function findNonOverlapping(claims){
    for(let claimA of claims) {
        for (let claimB of claims) {
            if (claimA.id === claimB.id) {
                continue;
            }
            if(overlaps(claimA, claimB)){
                claimA.overlaps = true;
                claimB.overlaps = true;
            }
        }
    }
    return claims.find(claim => claim.overlaps === false);
}

function solve(){
    const myInput = require("fs").readFileSync("src/03/input.txt").toString();
    const claims = myInput.split("\n");

    const part1 = computeOverlapping(claims);
    const part2 = findNonOverlapping(claims.map(parseClaim)).id;

    console.log("--- Day 3: No Matter How You Slice It ---");
    console.log(`Puzzle answer : ${part1}`);
    console.log("--- Part Two ---");
    console.log(`Puzzle answer : ${part2}`);
    console.log();
}

module.exports = {
    parseClaim,
    computeOverlapping,
    overlaps,
    findNonOverlapping,
    solve
};