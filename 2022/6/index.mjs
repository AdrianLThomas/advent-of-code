import * as fs from 'fs/promises'

const input = await fs.readFile('input.txt', { encoding: 'utf8' });
const allChars = input.split('');

// part 1
for (let i = 0; i < allChars.length; i++) {
    if (i >= 3) {
        const lastFour = new Set([allChars[i-3],allChars[i-2],allChars[i-1],allChars[i]])

        if (lastFour.size === 4) {
            // unique!
            console.log({part1: i + 1})
            break;
        }
    }
}

// part2
const startOfMessageSize = 14;
const startOfMessageSizeIndex = startOfMessageSize - 1;
for (let i = 0; i < allChars.length; i++) {
    if (i >= startOfMessageSizeIndex) {
        const theSet = new Set();
        for (let j = 0; j < startOfMessageSize; j++) {
            theSet.add(allChars[i - j]);
        }

        if (theSet.size === startOfMessageSize) {
            // unique!
            console.log({part2: i + 1})
            break;
        }
    }
}
