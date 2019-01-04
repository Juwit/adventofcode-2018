const expect = require("chai").expect;

const part1 = require("./part1");
const part2 = require("./part2");

const {reacting, reduce, triggerFullReduction} = part1;
const {removeUnits, optimizePolymer} = part2;

describe(part1.title, () => {

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

        it('should remove all units of specified type', () => {
           expect(removeUnits("a", polymer)).to.equal("dbcCCBcCcD");
           expect(removeUnits("b", polymer)).to.equal("daAcCaCAcCcaDA");
           expect(removeUnits("c", polymer)).to.equal("dabAaBAaDA");
           expect(removeUnits("d", polymer)).to.equal("abAcCaCBAcCcaA");
        });

        it("should find the size of the optimized polymer", () => {
            expect(optimizePolymer("dabAcCaCBAcCcaDA")).to.equal(4);
        });

    });

});