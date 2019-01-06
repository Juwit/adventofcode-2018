const fs = require("fs");

function solveDay(number){
    const dayPart1 = require(`./src/${number}/part1`);
    const dayPart2 = require(`./src/${number}/part2`);
    console.log(dayPart1.title);
    console.log(`Puzzle answer : ${dayPart1.solve()}`);
    console.log("--- Part Two ---");
    console.log(`Puzzle answer : ${dayPart2.solve()}`);
    console.log();
}

console.log("[Advent of Code 2018]");
console.log();

fs.readdirSync("src")
    .forEach(solveDay);