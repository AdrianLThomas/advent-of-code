import * as fs from 'fs/promises'

const input = await fs.readFile('input.txt', { encoding: 'utf8' });
const allChars = input.split('');

for (let i = 0; i < allChars.length; i++) {
    if (i >= 3) {
        const lastFour = new Set([allChars[i-3],allChars[i-2],allChars[i-1],allChars[i]])

        if (lastFour.size === 4) {
            // unique!
            console.log({answer: i + 1})
            break;
        }
    }
}
