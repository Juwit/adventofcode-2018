const {parse, manhattanDistance} = require("./common");

function distanceSum(from, points){
    return points.reduce((current, point)=>current + manhattanDistance(from, point), 0);
}

function distanceSumArea(points, maxDistance) {
    const maxX = points.map(point => point.x).reduce((max, current) => current>max?current:max, 0) * 2;
    const maxY = points.map(point => point.y).reduce((max, current) => current>max?current:max, 0) * 2;

    let area = 0;

    for(let x = 0; x < maxX; x++){
        for(let y = 0; y < maxY; y++){
            let point = {x,y};
            if( distanceSum(point, points) < maxDistance ){
                area++;
            }
        }
    }
    return area;
}

function solve(){
    const myInput = require("fs").readFileSync("src/06/input.txt").toString();

    const points = parse(myInput);
    return distanceSumArea(points, 10000);
}

module.exports = {
    distanceSum,
    distanceSumArea,
    solve
};