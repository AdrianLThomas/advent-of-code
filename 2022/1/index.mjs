import * as fs from 'fs/promises'

const input = await fs.readFile('input.txt', { encoding: 'utf8' });
const inputArray = input.split('\n');

const calories = [];
let sum = 0;
for (let i = 0; i < inputArray.length - 1; i++) {
    const currentLine = parseInt(inputArray[i], 10);
    if (!currentLine) {
        calories.push(sum);
        sum = 0;
        continue;
    }

    sum += currentLine
}

const sortedCalories = calories.sort(function(a,b){return b - a})
console.log({
    topElf: sortedCalories[0],
    sumOfTopThree: sortedCalories[0] + sortedCalories[1] + sortedCalories[2]
});
