const expect = require("chai").expect;

const part1 = require("./part1");
const part2 = require("./part2");

const {Circle, MarbleGame} = part1;
const {} = part2;

describe(part1.title, () => {

    describe("--- Part One ---", () => {

        it("should add marbles correctly in the circle", () => {
            let circle = new Circle();

            circle.addMarble(1);
            expect(circle.state).to.deep.equal([0, 1]);

            circle.addMarble(2);
            expect(circle.state).to.deep.equal([0, 2, 1]);

            circle.addMarble(3);
            expect(circle.state).to.deep.equal([0, 2, 1, 3]);

            circle.addMarble(4);
            expect(circle.state).to.deep.equal([0, 4, 2, 1, 3]);

            circle.addMarble(5);
            expect(circle.state).to.deep.equal([0, 4, 2, 5, 1, 3]);

            circle.addMarble(6);
            expect(circle.state).to.deep.equal([0, 4, 2, 5, 1, 6, 3]);
        });

        it("should have marbles", () => {
            let game = new MarbleGame(5);
            expect(game.marbles).to.deep.equal([1,2,3,4,5]);
        });

        it("should the marbles sequentially", () => {
            let game = new MarbleGame(5);

            // let's play 5 turns
            for(let i=0; i<5; i++){
                game.playTurn();
            }

            expect(game.circle.state).to.deep.equal([0, 4, 2, 5, 1, 3]);
        });

        it("should add score on marbles multiple of 23", () => {
            let game = new MarbleGame(25, 9);

            // let's play 22 turns
            for(let i=0; i<22; i++){
                game.playTurn();
            }
            expect(game.circle.state).to.deep.equal([0, 16, 8, 17, 4, 18, 9, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15]);

            game.playTurn();

            expect(game.players[4].score).to.equal(32);
            // other players still at 0 !
            expect(game.players[0].score).to.equal(0);
            expect(game.circle.state).to.deep.equal([0, 16, 8, 17, 4, 18, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15]);
        });

        it("should then continue the game", () => {
            let game = new MarbleGame(25, 9);

            // let's play 24 turns
            for(let i=0; i<24; i++){
                game.playTurn();
            }

            expect(game.circle.state).to.deep.equal([0, 16, 8, 17, 4, 18, 19, 2, 24, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15]);
        });

        const testData = [
            {marbleCount: 1618, playerCount: 10, expectedHighScore: 8317},
            {marbleCount: 1104, playerCount: 17, expectedHighScore: 2764}
        ];


        testData.forEach(data => {
            it(`should find the highest score for ${data.marbleCount} marbles and ${data.playerCount} players`, () => {
                let game = new MarbleGame(data.marbleCount, data.playerCount);
                game.play();
                expect(game.highestScore()).to.equal(data.expectedHighScore);
            });
        });

    });

    describe("--- Part Two ---", () => {

    });

});