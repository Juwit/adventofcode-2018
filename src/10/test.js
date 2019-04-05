const expect = require("chai").expect;

const part1 = require("./part1");
const part2 = require("./part2");

const {parse, setUpSky, print, move1Second} = part1;
const {} = part2;

describe(part1.title, () => {

    describe("--- Part One ---", () => {

        it("should parse a star position", () => {
            expect(parse("position=< 9,  1> velocity=< 0,  2>")).to.deep.equal({position:{x:9, y:1}, velocity:{x:0,y:2}});
            expect(parse("position=< 7,  0> velocity=<-1,  0>")).to.deep.equal({position:{x:7, y:0}, velocity:{x:-1,y:0}});
        });

        const specs = [
            "position=< 9,  1> velocity=< 0,  2>",
            "position=< 7,  0> velocity=<-1,  0>",
            "position=< 3, -2> velocity=<-1,  1>",
            "position=< 6, 10> velocity=<-2, -1>",
            "position=< 2, -4> velocity=< 2,  2>",
            "position=<-6, 10> velocity=< 2, -2>",
            "position=< 1,  8> velocity=< 1, -1>",
            "position=< 1,  7> velocity=< 1,  0>",
            "position=<-3, 11> velocity=< 1, -2>",
            "position=< 7,  6> velocity=<-1, -1>",
            "position=<-2,  3> velocity=< 1,  0>",
            "position=<-4,  3> velocity=< 2,  0>",
            "position=<10, -3> velocity=<-1,  1>",
            "position=< 5, 11> velocity=< 1, -2>",
            "position=< 4,  7> velocity=< 0, -1>",
            "position=< 8, -2> velocity=< 0,  1>",
            "position=<15,  0> velocity=<-2,  0>",
            "position=< 1,  6> velocity=< 1,  0>",
            "position=< 8,  9> velocity=< 0, -1>",
            "position=< 3,  3> velocity=<-1,  1>",
            "position=< 0,  5> velocity=< 0, -1>",
            "position=<-2,  2> velocity=< 2,  0>",
            "position=< 5, -2> velocity=< 1,  2>",
            "position=< 1,  4> velocity=< 2,  1>",
            "position=<-2,  7> velocity=< 2, -2>",
            "position=< 3,  6> velocity=<-1, -1>",
            "position=< 5,  0> velocity=< 1,  0>",
            "position=<-6,  0> velocity=< 2,  0>",
            "position=< 5,  9> velocity=< 1, -2>",
            "position=<14,  7> velocity=<-2,  0>",
            "position=<-3,  6> velocity=< 2, -1>"];

        it("should print the sky", () => {
            const parsedSpecs = specs.map(parse);
            setUpSky(parsedSpecs);
            const sky = print(parsedSpecs);
            expect(sky).to.deep.equal([
                "........#.............",
                "................#.....",
                ".........#.#..#.......",
                "......................",
                "#..........#.#.......#",
                "...............#......",
                "....#.................",
                "..#.#....#............",
                ".......#..............",
                "......#...............",
                "...#...#.#...#........",
                "....#..#..#.........#.",
                ".......#..............",
                "...........#..#.......",
                "#...........#.........",
                "...#.......#.........."])
        });

        it('should move all the stars according to their velocity', function () {
            const parsedSpecs = specs.map(parse);

            move1Second(parsedSpecs);
            const sky = print(parsedSpecs);
            // I removed unnecessary lines and colomns on this example
            expect(sky).to.deep.equal([
                "........#....#....",
                "......#.....#.....",
                "#.........#......#",
                "..................",
                "....#.............",
                "..##.........#....",
                "....#.#...........",
                "...##.##..#.......",
                "......#.#.........",
                "......#...#.....#.",
                "#...........#.....",
                "..#.....#.#......."]);
        });

    });

    describe("--- Part Two ---", () => {

        it("should work", () => {
            expect(true).to.equal(true);
        });

    });

});