import * as fs from 'fs/promises';

const data = await fs.readFile('input.txt', { encoding: 'utf8' });

const winScore = 6;
const loseScore = 0;
const drawScore = 3;

const moves = {
    rock: {
        theirs: 'A',
        mine: 'X',
        score: 1,
    },
    paper: {
        theirs: 'B',
        mine: 'Y',
        score: 2,
    },
    scissors: {
        theirs: 'C',
        mine: 'Z',
        score: 3,
    },
}

const strategy = data.split('\n');

const allScoresA = strategy.map(x => {
    const [theirs, mine] = x.split(' ')

    switch (theirs) {
        case moves.rock.theirs:
            switch(mine) {
                case moves.rock.mine:
                    return moves.rock.score + drawScore;
                case moves.paper.mine:
                    return moves.paper.score + winScore;
                case moves.scissors.mine:
                    return moves.scissors.score + loseScore;
                default:
                    console.error('bad things')
            }
        case moves.paper.theirs:
            switch(mine) {
                case moves.rock.mine:
                    return moves.rock.score + loseScore;
                case moves.paper.mine:
                    return moves.paper.score + drawScore
                case moves.scissors.mine:
                    return moves.scissors.score + winScore;
                default:
                    console.error('bad things')
            }
        case moves.scissors.theirs:
            switch(mine) {
                case moves.rock.mine:
                    return moves.rock.score + winScore;
                case moves.paper.mine:
                    return moves.paper.score + loseScore;
                case moves.scissors.mine:
                    return moves.scissors.score + drawScore;
                default:
                    console.error('bad things')
            }
    }
});

const allScoresB = strategy.map(x => {
    const [theirs, mine] = x.split(' ')

    const lose = 'X';
    const draw = 'Y';
    const win = 'Z';

    switch (theirs) {
        case moves.rock.theirs:
            switch(mine) {
                case lose:
                    return moves.scissors.score + loseScore;
                case win:
                    return moves.paper.score + winScore;
                case draw:
                    return moves.rock.score + drawScore;
                default:
                    console.error('bad things')
            }
        case moves.paper.theirs:
            switch(mine) {
                case lose:
                    return moves.rock.score + loseScore;
                case win:
                    return moves.scissors.score + winScore;
                case draw:
                    return moves.paper.score + drawScore
                default:
                    console.error('bad things')
            }
        case moves.scissors.theirs:
            switch(mine) {
                case lose:
                    return moves.paper.score + loseScore;
                case win:
                    return moves.rock.score + winScore;
                case draw:
                    return moves.scissors.score + drawScore;
                default:
                    console.error('bad things')
            }
    }
});

const scoreA = allScoresA.reduce((acc,curr) => {
    return acc + curr;
}, 0);

const scoreB = allScoresB.reduce((acc,curr) => {
    return acc + curr;
}, 0);

console.log(`Part A: ${scoreA}\nPart B: ${scoreB}`)