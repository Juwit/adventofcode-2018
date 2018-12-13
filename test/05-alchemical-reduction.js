const expect = require("chai").expect;

const {reacting, reduce, triggerFullReduction} = require("../src/05-alchemical-reduction");

describe("--- Day 5: Alchemical Reduction ---", () => {

    let polymer = `dabAcCaCBAcCcaDA`;

    describe("--- Part One ---", () => {

        it("should find reacting units", ()=>{
            expect(reacting('A', 'a')).to.equal(true);
            expect(reacting('A', 'A')).to.equal(false);
            expect(reacting('b', 'B')).to.equal(true);
            expect(reacting('r', 'S')).to.equal(false);
        });

        it("should reduce polymers", () => {
            expect(reduce("sr")).to.equal("sr");
            expect(reduce("Aa")).to.equal("");
            expect(reduce("abBA")).to.equal("aA");
            expect(reduce("abAB")).to.equal("abAB");
            expect(reduce("dabAcCaCBAcCcaDA")).to.equal("dabAaCBAcaDA");
        });

        it("should destroy reacting units", () => {
           expect(triggerFullReduction("sr")).to.equal("sr");
           expect(triggerFullReduction("Aa")).to.equal("");
           expect(triggerFullReduction("abBA")).to.equal("");
           expect(triggerFullReduction("abAB")).to.equal("abAB");
           expect(triggerFullReduction("aabAAB")).to.equal("aabAAB");
        });

        it("should reduce the example polymer", () => {
           expect(triggerFullReduction(polymer)).to.equal("dabCBAcaDA");
        });

    });

    describe("--- Part Two ---", () => {

    });

});