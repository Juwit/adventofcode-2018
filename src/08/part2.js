const {buildNode} = require("./part1");

function value(node){
    if(node.children.length === 0){
        return node.metadata.reduce((a,b) => a+b, 0);
    }
    else{
        // using metadata as indexes
        let sum = 0;
        node.metadata.forEach(metadataValue => {
           const nodeIndex = metadataValue - 1;
           if(nodeIndex >= 0 && nodeIndex < node.children.length){
               sum += value(node.children[nodeIndex]);
           }
        });
        return sum;
    }
}

function solve(){
    const myInput = require("fs").readFileSync("src/08/input.txt").toString();

    const nodeSpec = myInput.split(" ").map(val => parseInt(val));

    const tree = buildNode(nodeSpec).node;
    return value(tree);
}

module.exports = {
    value,
    solve
};