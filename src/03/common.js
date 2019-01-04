const claimRegex = /#(\d*) @ (\d*),(\d*): (\d*)x(\d*)/;

function parseClaim(claim){
    let [_, id, left, top, width, height] = claimRegex.exec(claim);
    return {
        id : parseInt(id),
        position: {
            left: parseInt(left),
            top: parseInt(top)
        },
        size: {
            width: parseInt(width),
            height: parseInt(height)
        },
        overlaps: false
    }
}

module.exports = {
    parseClaim
};