const {parse, setUpSky, move1Second} = require("./part1");

function solve(){
    const specs = require("fs").readFileSync("src/10/input.txt").toString().split("\n");

    const stars = specs.map(parse);
    let height = setUpSky(stars);

    // there's only 350 stars, and the sky at first is huuuuuge (about 100k x 100k!)
    // let's iterate a bit until the stars are closer to each other
    let seconds = 0;
    while(height > 15){
        move1Second(stars);
        seconds++;
        height = setUpSky(stars);
    }

    return seconds;
}

module.exports = {
    solve
};