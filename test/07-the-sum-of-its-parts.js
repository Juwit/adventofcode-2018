const expect = require("chai").expect;

const {parse, dependencyMap, nextStep, order, computeTime, computeSteps} = require("../src/07/07-the-sum-of-its-parts");

describe("--- Day 7: The Sum of Its Parts ---", () => {

    const input = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`;

    const requirements = [
        {from:"C", to:"A"},
        {from:"C", to:"F"},
        {from:"A", to:"B"},
        {from:"A", to:"D"},
        {from:"B", to:"E"},
        {from:"D", to:"E"},
        {from:"F", to:"E"}
    ];

    describe("--- Part One ---", () => {

        const map = new Map();
        map.set("A",new Set(["C"]));
        map.set("B",new Set(["A"]));
        map.set("C",new Set());
        map.set("D",new Set(["A"]));
        map.set("E",new Set(["B", "D", "F"]));
        map.set("F",new Set(["C"]));

        it("should parse the input", () => {
            expect(parse(input)).to.deep.equal(requirements);
        });

        it("should construct a dependency map from requirements", () => {
            expect(dependencyMap(requirements)).to.deep.equal(map);
        });

        it("should find the entry point from a dependency map", () => {
            expect(nextStep(map)).to.equal("C");
        });

        it("should find the correct order", () => {
            expect(order(map)).to.equal("CABDFE");
        });

    });

    describe("--- Part Two ---", () => {

        const map = new Map();
        map.set("A",new Set(["C"]));
        map.set("B",new Set(["A"]));
        map.set("C",new Set());
        map.set("D",new Set(["A"]));
        map.set("E",new Set(["B", "D", "F"]));
        map.set("F",new Set(["C"]));

        it("should complete step C in 3 seconds", () => {
           expect(computeTime("C")).to.equal(3);
        });

        it("should complete all steps in 15 seconds with 2 workers", () => {
           expect(computeSteps(map, 0, 2)).to.equal(15);
        });

    });

});