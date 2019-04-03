class Circle {

    constructor(){
        this.state = [0];
        this.currentMarbleIndex = 0;
    }

    addMarble(marbleValue){
        //find at which index to insert marble
        this.currentMarbleIndex += 2;
        this.currentMarbleIndex = this.currentMarbleIndex % this.state.length;

        this.state.splice(this.currentMarbleIndex+1, 0, marbleValue);
    }

    removeMarble7ClockWise(){
        this.currentMarbleIndex -= 6;
        if(this.currentMarbleIndex < 0){
            this.currentMarbleIndex += this.state.length;
        }
        this.currentMarbleIndex = this.currentMarbleIndex % this.state.length;

        const removedMarble = this.state.splice(this.currentMarbleIndex, 1);

        this.currentMarbleIndex--;

        return removedMarble[0];
    }

}

class MarbleGame {

    constructor(marbleCount, playerCount = 1){
        this.circle = new Circle();
        this.marbles = new Array(marbleCount).fill(0).map((val,idx)=> idx+1);

        this.players = [];
        for(let i = 0; i < playerCount; i++){
            this.players.push({score:0});
        }

        this.currentPlayer = 0;
    }

    playTurn(){
        // taking lowest marble
        const [currentMarble, ...otherMarbles] = this.marbles;
        this.marbles = otherMarbles;

        if(currentMarble % 23 === 0){
            // adding score
            this.players[this.currentPlayer].score += currentMarble;

            const removedMarble = this.circle.removeMarble7ClockWise();

            this.players[this.currentPlayer].score += removedMarble;
        }
        else{
            this.circle.addMarble(currentMarble);
        }

        // next player's turn !
        this.currentPlayer = ++this.currentPlayer % this.players.length;
    }

    play(){
        while(this.marbles.length !== 0){
            this.playTurn();

            if(this.marbles.length % 100 === 0){
                console.log(`Remaining marbles : ${this.marbles.length}`);
            }
        }
    }

    highestScore(){
        return this.players.map(player => player.score).sort((a,b)=>b-a)[0];
    }
}

function solve(){
    const playerCount = 458;
    const marbleCount = 71307;

    const game = new MarbleGame(marbleCount, playerCount);

    // WARNING : This step takes a loooooooong time ! (about 3 minutes)
    game.play();

    return game.highestScore();
}

module.exports = {
    Circle,
    MarbleGame,
    solve,
    title: "--- Day 9: Marble Mania ---"
};