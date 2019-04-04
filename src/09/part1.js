class Marble{
    constructor(value){
        this.value = value;
    }
}

class Circle {

    constructor(){
        // array is not performant enough!
        this.state = {value:0};
        this.root = this.state;
        this.state.previous = this.state;
        this.state.next = this.state;
    }

    toArray(){
        const res = [0];
        let pointer = this.root.next;
        while(pointer.value !== 0){
            res.push(pointer.value);
            pointer = pointer.next;
        }
        return res;
    }

    addMarble(marbleValue){
        // find at which index to insert marble
        const position = this.state.next;

        const previous = position.previous;
        const next = position.next;

        const marble = {value:marbleValue};
        // inserting !
        marble.previous = position;
        marble.next = next;

        position.next = marble;
        next.previous = marble;

        this.state = marble;
    }

    removeMarble7ClockWise(){
        const marbleToRemove = this.state.previous.previous.previous.previous.previous.previous.previous;
        this.state = marbleToRemove.next;

        // removing
        marbleToRemove.previous.next = marbleToRemove.next;

        return marbleToRemove.value;
    }

}

class MarbleGame {

    constructor(marbleCount, playerCount = 1){
        this.circle = new Circle();
        this.marbleCount = marbleCount;
        this.currentMarble = 0;

        this.players = [];
        for(let i = 0; i < playerCount; i++){
            this.players.push({score:0});
        }

        this.currentPlayer = 0;
    }

    playTurn(){
        this.currentMarble++;

        if(this.currentMarble % 23 === 0){
            // adding score
            this.players[this.currentPlayer].score += this.currentMarble;

            const removedMarble = this.circle.removeMarble7ClockWise();

            this.players[this.currentPlayer].score += removedMarble;
        }
        else{
            this.circle.addMarble(this.currentMarble);
        }

        // next player's turn !
        this.currentPlayer = ++this.currentPlayer % this.players.length;
    }

    play(){
        while(this.currentMarble < this.marbleCount){
            this.playTurn();
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

    game.play();
    return game.highestScore();
}

module.exports = {
    Circle,
    MarbleGame,
    solve,
    title: "--- Day 9: Marble Mania ---"
};