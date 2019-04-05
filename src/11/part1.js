function powerLevel(x, y, gridSerialNumber) {
    const rackId = x + 10;
    let result = rackId * y;
    result += gridSerialNumber;
    result *= rackId;
    result = (Math.floor(result / 100)) % 10;
    result -= 5;
    return result;
}

function computeGridPowerLevels(gridSerialNumber) {
    // building the grid !
    let grid = new Array(300).fill(0);
    grid = grid.map(_ => new Array(300).fill(0));

    // computing power levels for each grid cell
    for (let i = 0; i < 300; i++) {
        for (let j = 0; j < 300; j++) {
            grid[i][j] = powerLevel(i+1, j+1, gridSerialNumber);
        }
    }

    return grid;
}

function computeTotalPowers(grid, squareSize = 3) {
    let totalPowers = new Array(300).fill(0);
    totalPowers = totalPowers.map(_ => new Array(300).fill(0));

    // computing power levels for each grid cell
    for (let i = 0; i < 300; i++) {
        for (let j = 0; j < 300; j++) {

            // for each grid cell, get the 9 cells
            for (let x = i; x < Math.min(i+squareSize, 299); x++) {
                for (let y = j; y < Math.min(j+squareSize, 299); y++) {
                    totalPowers[i][j] += grid[x][y];
                }
            }
        }
    }

    return totalPowers;
}

function maxTotalPower(totalPowersGrid){
    const coordinates = {x:0, y:0, totalPower: 0};
    for (let i = 0; i < 300; i++) {
        for (let j = 0; j < 300; j++) {
            if(totalPowersGrid[i][j] > coordinates.totalPower){
                coordinates.totalPower = totalPowersGrid[i][j];
                coordinates.x = i + 1;
                coordinates.y = j + 1;
            }
        }
    }
    return coordinates;
}

function solve(){
    const gridSerialNumber = 6392;

    const grid = computeGridPowerLevels(gridSerialNumber);
    const totalPowers = computeTotalPowers(grid);
    const coordinates = maxTotalPower(totalPowers);

    return `${coordinates.x},${coordinates.y}`;
}

module.exports = {
    solve,
    powerLevel,
    computeGridPowerLevels,
    computeTotalPowers,
    maxTotalPower,
    title: "--- Day 11 : Chronal Charge ---"
};