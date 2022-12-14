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
            stacks[j].unshift(value);
        }
    }
}

const stringToInt = (x) => {
    const num = parseInt(x, 10);
    if(Number.isInteger(num)) {
        return num;
    }
    return x;
}

const allInstructions = inputArray.slice(indexOfHeaders + 2);
for (let i = 0; i < allInstructions.length; i++) {
    const [,times,,from,,to] = allInstructions[i].split(' ').map(stringToInt)

    for (let j = 0; j < times; j++) {
        stacks[to - 1].push(stacks[from - 1].pop());
    }
}

console.log({
    topCrates: stacks.map(stack => stack[stack.length - 1])
                     .map(crate => crate.replace('[','').replace(']',''))
                     .join('')
})