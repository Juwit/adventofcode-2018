const {parseClaim} = require("./common");

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

    return findNonOverlapping(claims.map(parseClaim)).id;
}

module.exports = {
    overlaps,
    findNonOverlapping,
    solve
};