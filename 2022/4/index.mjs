import * as fs from 'fs/promises'

const input = await fs.readFile('input.txt', { encoding: 'utf8' });
const inputArray = input.split('\n');

let sum = 0;
for(let i = 0; i < inputArray.length; i++) {
    const [range1, range2] = inputArray[i].split(',');

    const [startA, endA] = range1.split('-').map(x => parseInt(x));
    const [startB, endB] = range2.split('-').map(x => parseInt(x));

    const checkA = startA >= startB && endA <= endB;
    const checkB = startB >= startA && endB <= endA;
    const overlaps = checkA || checkB;

    if (overlaps) {
        sum++;
    }
}

console.log({sum})
