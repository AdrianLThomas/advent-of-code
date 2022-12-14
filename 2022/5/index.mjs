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

const stringToIndex = (x) => {
    const num = parseInt(x, 10);
    if(Number.isInteger(num)) {
        return num;
    }
    return [];
}

const allInstructions = inputArray.slice(indexOfHeaders + 2);

const part1 = JSON.parse(JSON.stringify(stacks))
const part2 = JSON.parse(JSON.stringify(stacks));
for (let i = 0; i < allInstructions.length; i++) {
    const [times,from,to] = allInstructions[i].split(' ').flatMap(stringToIndex)
    const fromIndex = from - 1;
    const toIndex = to - 1;

    // part 1
    for (let j = 0; j < times; j++) {
        part1[toIndex].push(part1[fromIndex].pop());
    }

    // part 2
    const fromStack = part2[fromIndex];
    const toStack = part2[toIndex];
    const crates = fromStack.splice(fromStack.length - times);
    toStack.push(...crates);
}

const formatSolution = (stacks) => stacks.map(stack => stack[stack.length - 1])
                                         .map(crate => crate.replace('[','').replace(']',''))
                                         .join('')

console.log({
    part1: formatSolution(part1),
    part2: formatSolution(part2),
})