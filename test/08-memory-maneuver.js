const expect = require("chai").expect;

const {buildNode, metadataSum} = require("../src/08-memory-maneuver");

describe("--- Day 8: Memory Maneuver ---", () => {

    const input = "2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2";

    describe("--- Part One ---", () => {

        it("should build a node without children", () => {
            const nodeSpec = "0 3 10 11 12".split(" ").map(val => parseInt(val));

            const node = buildNode(nodeSpec).node;

            expect(node.children).to.deep.equal([]);
            expect(node.metadata).to.deep.equal([10,11,12]);
        });

        it("should build a node with a child node", () => {
            const nodeSpec = "1 1 0 1 99 2".split(" ").map(val => parseInt(val));

            const node = buildNode(nodeSpec).node;

            expect(node.metadata).to.deep.equal([2]);

            const [childNode] = node.children;
            expect(childNode.children).to.deep.equal([]);
            expect(childNode.metadata).to.deep.equal([99]);
        });

        it("should build a node for the example input", () => {
            const nodeSpec = input.split(" ").map(val => parseInt(val));

            const node = buildNode(nodeSpec).node;

            expect(node.metadata).to.deep.equal([1,1,2]);
            expect(node.children[0].metadata).to.deep.equal([10,11,12]);
            expect(node.children[1].metadata).to.deep.equal([2]);
            expect(node.children[1].children[0].metadata).to.deep.equal([99]);
        });

        it("should compute the sum of metadatas", () => {
            const nodeSpec = input.split(" ").map(val => parseInt(val));

            const node = buildNode(nodeSpec).node;

            expect(metadataSum(node)).to.equal(138);
        });

    });

    describe("--- Part Two ---", () => {

    });

});