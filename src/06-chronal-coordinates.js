const lineRegex = /(\d*), (\d*)/;

function parse(input){
    return input.split("\n")
        .map(point => {
            const [_, x, y] = lineRegex.exec(point);
            return {x: parseInt(x),y: parseInt(y)};
        });
}

function manhattanDistance(pointA, pointB){
    return Math.abs(pointB.x - pointA.x) + Math.abs(pointB.y - pointA.y);
}

function closest(point, otherPoints){
    const distanceToOthers =  otherPoints
        .map(other => {return {point: other, distance: manhattanDistance(point, other)} })
        .sort((a,b)=>a.distance-b.distance);

    //console.log(point);
    //console.log(distanceToOthers);

    if(distanceToOthers[0].distance === distanceToOthers[1].distance){
        return undefined;
    }

    return distanceToOthers[0].point;
}

function buildGrid(points){
    const maxX = points.map(point => point.x).reduce((max, current) => current>max?current:max, 0);
    const maxY = points.map(point => point.y).reduce((max, current) => current>max?current:max, 0);

    const grid = new Array(maxX).fill(undefined).map(() => new Array(maxY));

    for(let x = 0; x < maxX; x++){
        for(let y = 0; y < maxY; y++){
            let point = {x,y};
            grid[x][y] = closest(point, points);
        }
    }
    return grid;
}

function greatestArea(grid, points){
    const pointsCount = new Map();
    points.forEach(point => pointsCount.set(point, 0));
    pointsCount.set(undefined, 0);

    for(let x = 0; x < grid.length-1; x++){
        for(let y = 0; y < grid[0].length-1; y++){

            let count = pointsCount.get(grid[x][y]);
            count++;
            pointsCount.set(grid[x][y], count);
        }
    }

    pointsCount.delete(undefined);
    // ignoring borders (infinite area)
    for(let x = 0; x < grid.length - 1; x++){
        pointsCount.delete(grid[x][0]);
        pointsCount.delete(grid[x][ grid[x].length - 1 ]);
    }
    for(let y = 0; y < grid[0].length - 1; y++){
        pointsCount.delete(grid[0][y]);
        pointsCount.delete(grid[ grid.length - 1][y]);
    }

    let max = 0;
    for(value of pointsCount.values()){
        if(value > max){
            max = value;
        }
    }
    return max;
}

function solve(){
    const myInput = require("fs").readFileSync("data/06-chronal-coordinates.txt").toString();

    const points = parse(myInput);
    const grid = buildGrid(points);
    const part1 = greatestArea(grid, points);

    console.log("--- Day 6: Chronal Coordinates ---");
    console.log(`Puzzle answer : ${part1}`);
    console.log();
}

module.exports = {
    parse,
    manhattanDistance,
    closest,
    buildGrid,
    greatestArea,
    solve
};