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
    const myInput = require("fs").readFileSync("src/08/input.txt").toString();

    const nodeSpec = myInput.split(" ").map(val => parseInt(val));

    const tree = buildNode(nodeSpec).node;
    return metadataSum(tree);
}

module.exports = {
    buildNode,
    metadataSum,
    solve,
    title: "--- Day 8: Memory Maneuver ---"
};