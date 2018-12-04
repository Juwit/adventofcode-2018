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
        }
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

function solve(){
    const myInput = require("fs").readFileSync("data/03-no-matter-how-you-slice-it.txt").toString();
    const claims = myInput.split("\n");

    const part1 = computeOverlapping(claims);

    console.log("--- Day 3: No Matter How You Slice It ---");
    console.log(`Puzzle answer : ${part1}`);
    console.log();
}

module.exports = {
    parseClaim,
    computeOverlapping,
    solve
};