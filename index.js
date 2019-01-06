const fs = require("fs");
const moment = require("moment");

function solveDay(number){
    const dayPart1 = require(`./src/${number}/part1`);
    const dayPart2 = require(`./src/${number}/part2`);

    const startTimePart1 = moment();
    const part1Solution = dayPart1.solve();
    const endTimePart1 = moment();

    const startTimePart2 = moment();
    const part2Solution = dayPart2.solve();
    const endTimePart2 = moment();

    console.log(dayPart1.title);
    console.log(`Puzzle answer : ${part1Solution} - time : ${moment(endTimePart1.diff(startTimePart1)).format('mm:ss:SSSS')}`);
    console.log("--- Part Two ---");
    console.log(`Puzzle answer : ${part2Solution} - time : ${moment(endTimePart2.diff(startTimePart2)).format('mm:ss:SSSS')}`);
    console.log();
}

console.log("[Advent of Code 2018]");
console.log();

fs.readdirSync("src")
    .forEach(solveDay);