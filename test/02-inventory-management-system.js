const expect = require("chai").expect;

const {hasLetterOccurencies, twoOfAny, threeOfAny, checksum} = require("../src/02-inventory-management-system");


describe("--- Day 2: Inventory Management System ---", () => {

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

    });

});