const expect = require("chai").expect;

const {parseClaim, computeOverlapping} = require("../src/03-no-matter-how-you-slice-it");


describe("--- Day 3: No Matter How You Slice It ---", () => {

    describe("--- Part One ---", () => {

        const claims = [
            "#1 @ 1,3: 4x4",
            "#2 @ 3,1: 4x4",
            "#3 @ 5,5: 2x2"
        ];

        it("should parse a claim", () => {
           let result = parseClaim("#123 @ 3,2: 5x4");
           expect(result.id).to.equal(123);
           expect(result.position.left).to.equal(3);
           expect(result.position.top).to.equal(2);
           expect(result.size.width).to.equal(5);
           expect(result.size.height).to.equal(4);
        });

        it("should count overlapping square inches", () => {
            let result = computeOverlapping(claims);
            expect(result).to.equal(4);
        });

    });

});