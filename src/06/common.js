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


module.exports = {
    parse,
    manhattanDistance
};