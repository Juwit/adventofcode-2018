const expect = require("chai").expect;

const computeFrequency = require("../src/01-chronal-calibration").computeFrequency;

describe("--- Day 1: Chronal Calibration ---", () => {

    const examples = [
        {
            "frequencies": "+1, +1, +1",
            "result": 3
        },
        {
            "frequencies": "+1, +1, -2",
            "result": 0
        },
        {
            "frequencies": "-1, -2, -3",
            "result": -6
        }

    ];

    it("should compute device frequencies", ()=>{
        examples.forEach(example => {
            let result = computeFrequency(example.frequencies.split(", "));
            expect(result).to.equal(example.result);
        })
    });

});