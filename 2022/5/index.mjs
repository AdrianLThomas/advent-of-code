import * as fs from 'fs/promises'

const input = await fs.readFile('input.txt', { encoding: 'utf8' });
const inputArray = input.split('\n');

const indexOfHeaders = inputArray.findIndex((value) => value.startsWith(' 1'));

const allColumns = inputArray[indexOfHeaders].split('   ');
const numberOfColumns = parseInt(allColumns[allColumns.length - 1]);

// structure the data
const stacks = [...Array(numberOfColumns).fill().map(() => [])];
for (let i = 0; i < indexOfHeaders; i++) {
    const crates = inputArray[i].match(/.{1,4}/g);

    for (let j = 0; j < crates.length; j++) {
        const value = crates[j].trim();
        if(value) {
            stacks[j].push(value);
        }
    }
}

console.log({stacks})

const allInstructions = inputArray.slice(indexOfHeaders + 2);
for (let i = 0; i < allInstructions.length; i++) {
    // number of moves
    // from
    // to
    // allInstructions[i]
    /* 
        for (let j = 0; j < numberOfMoves; j++) {
            stacks[to - 1].push(stacks[from - 1].pop());
            // TODO reverse each stack for push pop? or just use shift/unshift..
        }
    */
}
