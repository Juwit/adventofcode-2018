function buildNode(nodeSpec){
    const [childNodes, metadata] = nodeSpec;
    let subSpec = nodeSpec.slice(2);

    let node = {children:[], metadata:[]};

    for(let i = 0; i < childNodes; i++){
        let result = buildNode(subSpec);
        subSpec = result.subSpec;
        node.children.push( result.node );
    }

    for(let i = 0; i < metadata; i++){
        node.metadata.push(subSpec[i]);
    }
    subSpec = subSpec.slice(metadata);
    return {node, subSpec};
}

function metadataSum(node){
    let sum = node.metadata.reduce((a,b) => a+b, 0);
    node.children.forEach(child => {
       sum += metadataSum(child);
    });
    return sum;
}

function solve(){
    const myInput = require("fs").readFileSync("data/08-memory-maneuver.txt").toString();

    const nodeSpec = myInput.split(" ").map(val => parseInt(val));

    const tree = buildNode(nodeSpec).node;
    const part1 = metadataSum(tree);

    console.log("--- Day 8: Memory Maneuver ---");
    console.log(`Puzzle answer : ${part1}`);
    console.log("--- Part Two ---");
    console.log(`Puzzle answer : ${part2}`);
    console.log();
}

module.exports = {
    buildNode,
    metadataSum,
    solve
};