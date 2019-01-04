const expect = require("chai").expect;

const {parse, manhattanDistance, closest, buildGrid, greatestArea, distanceSum, distanceSumArea} = require("../src/06/06-chronal-coordinates");

describe("--- Day 6: Chronal Coordinates ---", () => {

    let pointA = {x:1, y:1};
    let pointB = {x:1, y:6};
    let pointC = {x:8, y:3};
    let pointD = {x:3, y:4};
    let pointE = {x:5, y:5};
    let pointF = {x:8, y:9};
    const points = [pointA, pointB, pointC, pointD, pointE, pointF];

    describe("--- Part One ---", () => {

        it("should parse points", () => {
            let input = `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`;
            expect(parse(input)).to.deep.equal(points);
        });


        it("should compute the manhattan distance for 2 points", ()=>{
            expect(manhattanDistance(pointA, pointB)).to.equal(5);
            expect(manhattanDistance(pointA, pointC)).to.equal(9);
        });

        it("should find when points are closest to another", () => {
            expect(closest({x:0, y:0}, [pointA,pointB,pointC])).to.deep.equal(pointA);
            expect(closest({x:4, y:0}, [pointA,pointB,pointC])).to.deep.equal(pointA);
            expect(closest({x:6, y:0}, [pointA,pointB,pointC])).to.deep.equal(pointC);
        });

        it("should fin when points are at egual distance to another", () => {
            expect(closest({x:0, y:4}, points)).to.equal(undefined);
            expect(closest({x:1, y:4}, points)).to.equal(undefined);
            expect(closest({x:5, y:0}, points)).to.equal(undefined);
            expect(closest({x:5, y:1}, points)).to.equal(undefined);
        });

        it("should build the grid for the given points", () => {
            const grid = buildGrid(points);

            expect(grid[0][0]).to.deep.equal(pointA);
            expect(grid[4][0]).to.deep.equal(pointA);
            expect(grid[5][0]).to.deep.equal(undefined);
            expect(grid[6][0]).to.deep.equal(pointC);
            expect(grid[7][0]).to.deep.equal(pointC);
            expect(grid[0][4]).to.deep.equal(undefined);
            expect(grid[1][4]).to.deep.equal(undefined);
            expect(grid[2][4]).to.deep.equal(pointD);
            expect(grid[4][4]).to.deep.equal(pointD);
            expect(grid[5][4]).to.deep.equal(pointE);
            expect(grid[6][4]).to.deep.equal(pointE);
            expect(grid[7][4]).to.deep.equal(pointC);
        });

        it("should find the greatest area", () => {
            const grid = buildGrid(points);
            const result = greatestArea(grid, points);

            expect(result).to.equal(9);
        });

    });

    describe("--- Part Two ---", () => {

        it("should compute the sum of the distances for a point", () => {
           expect(distanceSum({x:4,y:3}, points)).to.equal(30);
        });

        it("should find the area size of maximal distanceSum", () => {

           expect(distanceSumArea(points, 32)).to.equal(16);
        });

    });

});