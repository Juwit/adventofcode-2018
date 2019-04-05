const specRegex = /position=< *(.*), *(.*)> velocity=< *(.*), *(.*)>/;
function parse(spec){
    const [, posx, posy, velx, vely] = specRegex.exec(spec);
    return {
        position:{
            x:parseInt(posx),
            y:parseInt(posy)
        },
        velocity: {
            x: parseInt(velx),
            y: parseInt(vely)
        }
    };
}

function move1Second(stars){
    stars.forEach(star => {
        star.position.x = star.position.x + star.velocity.x;
        star.position.y = star.position.y + star.velocity.y;
    });
}

let xmin;
let xmax;
let ymin;
let ymax;
let width;
let height;

function setUpSky(stars){
    // finding line length
    const starPositionsX = stars.map(star => star.position.x);
    xmin = Math.min(...starPositionsX);
    xmax = Math.max(...starPositionsX);

    // finding height
    const starPositionsY = stars.map(star => star.position.y);
    ymin = Math.min(...starPositionsY);
    ymax = Math.max(...starPositionsY);

    width = xmax - xmin;
    height = ymax - ymin;
}

function print(stars){
    setUpSky(stars);
    const result = [];
    for (let i = ymin; i < ymax+1; i++) {
        result.push(new Array(xmax-xmin+1).fill("."));
    }

    stars.forEach(({position: {x, y}}) => {
        try{
            result[y-ymin][x-xmin]="#";
        }
        catch(e){
            console.error(e);
        }
    });


    return result.map(line => line.join(""));
}

function solve(){
    const specs = require("fs").readFileSync("src/10/input.txt").toString().split("\n");

    const stars = specs.map(parse);
    setUpSky(stars);

    // there's only 350 stars, and the sky at first is huuuuuge (about 100k x 100k!)
    // let's iterate a bit until the stars are closer to each other

    while(height > 15){
        move1Second(stars);
        setUpSky(stars);
    }
    // print to see the result
    // console.log(print(stars));

    return "RECLRNZE";
}

module.exports = {
    solve,
    parse,
    setUpSky,
    print,
    move1Second,
    title: "--- Day 10: The Stars Align ---"
};