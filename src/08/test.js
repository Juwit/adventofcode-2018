const expect = require("chai").expect;

const part1 = require("./part1");
const part2 = require("./part2");

const {buildNode, metadataSum} = part1;
const {value} = part2;

describe(part1.title, () => {

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

        it("should compute the value of a no child node", () => {
            const nodeBSpec = [0, 3, 10, 11, 12];
            const nodeB = buildNode(nodeBSpec).node;

            const nodeDSpec = [0, 1, 99];
            const nodeD = buildNode(nodeDSpec).node;

            expect(value(nodeB)).to.equal(33);
            expect(value(nodeD)).to.equal(99);
        });

        it("should compute the value of a node with children using metadata indexes", () => {
            const nodeCSpec = [1, 1, 0, 1, 99, 2];
            const nodeC = buildNode(nodeCSpec).node;

            expect(value(nodeC)).to.equal(0);

            const nodeASpec = input.split(" ").map(a => parseInt(a));
            const nodeA = buildNode(nodeASpec).node;
            expect(value(nodeA)).to.equal(66);
        });

    });

});