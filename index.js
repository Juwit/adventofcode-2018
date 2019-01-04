console.log("[Advent of Code 2018]");
console.log();

const day01Part1 = require("./src/01/part1");
const day01Part2 = require("./src/01/part2");
console.log(day01Part1.title);
console.log(`Puzzle answer : ${day01Part1.solve()}`);
console.log("--- Part Two ---");
console.log(`Puzzle answer : ${day01Part2.solve()}`);

console.log();

const day02Part1 = require("./src/02/part1");
const day02Part2 = require("./src/02/part2");
console.log(day02Part1.title);
console.log(`Puzzle answer : ${day02Part1.solve()}`);
console.log("--- Part Two ---");
console.log(`Puzzle answer : ${day02Part2.solve()}`);

console.log();

require("./src/03/03-no-matter-how-you-slice-it").solve();
require("./src/04/04-repose-records").solve();
require("./src/05/05-alchemical-reduction").solve();
require("./src/06/06-chronal-coordinates").solve();
require("./src/07/07-the-sum-of-its-parts").solve();
require("./src/08/08-memory-maneuver").solve();