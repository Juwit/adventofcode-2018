const {parseClaim} = require("./common");

function computeOverlapping(claims){
    let fabric = [];
    for(let i = 0; i < 1000; i++){
        fabric[i] = [];
        for(let j = 0; j < 1000; j++){
            fabric[i][j] = 0;
        }
    }

    claims.forEach( claim => claimFabric(fabric, claim) );

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

function solve(){
    const myInput = require("fs").readFileSync("src/03/input.txt").toString();
    const claims = myInput.split("\n");

    return computeOverlapping(claims.map(parseClaim));
}

module.exports = {
    computeOverlapping,
    solve,
    title: "--- Day 3: No Matter How You Slice It ---"
};