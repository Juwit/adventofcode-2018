const {computeGridPowerLevels, computeTotalPowers, maxTotalPower} = require("./part1");

function maxTotalPowerSquare(grid){
    let coordinates = {x:0, y:0, totalPower: 0, squareSize: 0};

    // let's try the 20 first sizes
    for (let squareSize = 1; squareSize <= 20; squareSize++) {
        const totalPowers = computeTotalPowers(grid, squareSize);
        const localMax = maxTotalPower(totalPowers);
        // console.debug(`square size : ${squareSize}, localMax : ${JSON.stringify(localMax)}`);
        if(localMax.totalPower > coordinates.totalPower){
            coordinates = {...localMax, squareSize};
        }
    }
    return coordinates;
}

function solve(){
    const gridSerialNumber = 6392;
    const grid = computeGridPowerLevels(gridSerialNumber);
    const coordinates = maxTotalPowerSquare(grid);

    return `${coordinates.x},${coordinates.y},${coordinates.squareSize}`;
}

module.exports = {
    maxTotalPowerSquare,
    solve
};