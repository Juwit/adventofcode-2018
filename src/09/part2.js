const {MarbleGame} = require("./part1");

function solve(){
    const playerCount = 458;
    const marbleCount = 71307 * 100;

    const game = new MarbleGame(marbleCount, playerCount);

    game.play();

    return game.highestScore();
}

module.exports = {
    solve
};