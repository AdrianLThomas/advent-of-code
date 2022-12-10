import * as fs from 'fs/promises'

const input = await fs.readFile('input.txt', { encoding: 'utf8' });
const inputArray = input.split('\n');

const getPriority = (char) => {
    const modifier = char === char.toLowerCase() ? 96 : 38;
    
    return char.charCodeAt() - modifier
}

// # part 1
let runningTotal = 0;
for (let i = 0; i < inputArray.length; i++) {
    const c1 = inputArray[i].substring(0, inputArray[i].length / 2).split('')
    const c2 = inputArray[i].substring(inputArray[i].length / 2).split('')  

    const set = [...new Set(c1)].filter(Set.prototype.has, new Set(c2));

    const sumOfPriorities = set.reduce((acc, cur) => {
        return acc + getPriority(cur);
    }, 0);
    
    runningTotal += sumOfPriorities;
}

console.log({runningTotal})

// # part 2

// sum all priorities
let badgeTotal = 0;
for (let i = 0; i < inputArray.length; i += 3) {
    // find badge across every 3 lines
    const data = [inputArray[i].split(''), inputArray[i + 1].split(''), inputArray[i + 2].split('')];
    const intersection = data.reduce((a, b) => a.filter(c => b.includes(c)));
    
    const p = getPriority(intersection[0])
    badgeTotal += p
}

console.log({badgeTotal})
