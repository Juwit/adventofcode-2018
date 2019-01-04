const expect = require("chai").expect;

const part1 = require("./part1");
const part2 = require("./part2");

const {hasLetterOccurencies, twoOfAny, threeOfAny, checksum} = part1;
const {distance, lowestDistance, lowestDistanceCommonLetters} = part2;

describe(part1.title, () => {

    describe("--- Part One ---", () => {

        const boxIds = [
            "abcdef",
            "bababc",
            "abbcde",
            "abcccd",
            "aabcdd",
            "abcdee",
            "ababab"
        ];

        it("should count letter occurencies", () => {
            expect(hasLetterOccurencies(2, "abcdef")).to.equal(false);
            expect(hasLetterOccurencies(3, "abcdef")).to.equal(false);

            expect(hasLetterOccurencies(2, "bababc")).to.equal(true);
            expect(hasLetterOccurencies(3, "bababc")).to.equal(true);

            expect(hasLetterOccurencies(2, "abbcde")).to.equal(true);
            expect(hasLetterOccurencies(3, "abbcde")).to.equal(false);

            expect(hasLetterOccurencies(2, "abcccd")).to.equal(false);
            expect(hasLetterOccurencies(3, "abcccd")).to.equal(true);

            expect(hasLetterOccurencies(2, "aabcdd")).to.equal(true);
            expect(hasLetterOccurencies(3, "aabcdd")).to.equal(false);

            expect(hasLetterOccurencies(2, "abcdee")).to.equal(true);
            expect(hasLetterOccurencies(3, "abcdee")).to.equal(false);

            expect(hasLetterOccurencies(2, "ababab")).to.equal(false);
            expect(hasLetterOccurencies(3, "ababab")).to.equal(true);
        });

        it("should count two of any letters ids", () => {
           let result = twoOfAny(boxIds);
           expect(result).to.equal(4);
        });

        it("should count three of any letters ids", () => {
            let result = threeOfAny(boxIds);
            expect(result).to.equal(3);
        });

        it("should compute the checksum", () => {
           let result = checksum(boxIds);
           expect(result).to.equal(12);
        });

    });

    describe("--- Part Two ---", () => {
        const boxIds = [
            "abcde",
            "fghij",
            "klmno",
            "pqrst",
            "fguij",
            "axcye",
            "wvxyz",
        ];

        it("should count the distance between ids", () => {
            expect( distance("abcde", "axcye") ).to.equal(2);
            expect( distance("fghij", "fguij") ).to.equal(1);
        });

        it("should find the ids with the lowest distance", () => {
            let result = lowestDistance(boxIds);
            expect(result.a).to.equal("fghij");
            expect(result.b).to.equal("fguij");
        });

        it("should compute the least-distance boxIds", () => {
            let result = lowestDistanceCommonLetters(boxIds);
            expect(result).to.equal("fgij");
        });
    });

});